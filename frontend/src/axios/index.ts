import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds
})

let currentAccessToken: string | null = null
let refreshTokenCallback: (() => Promise<string | null>) | null = null
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (error?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })

  failedQueue = []
}

// Setters
export const setCurrentAccessToken = (token: string | null) => {
  currentAccessToken = token
}

export const setRefreshTokenCallback = (
  callback: () => Promise<string | null>,
) => {
  refreshTokenCallback = callback
}

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (currentAccessToken) {
      config.headers.Authorization = `Bearer ${currentAccessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/token/refresh') &&
      !originalRequest.url?.includes('/sessions') 
    ) {
      
      if (isRefreshing) {
        // if isRefreshing is true, we will wait until the token is refreshed
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${currentAccessToken}`
            return axiosInstance(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        if (!refreshTokenCallback) {
          throw new Error('Refresh token callback not set')
        }

        const newAccessToken = await refreshTokenCallback()

        if (newAccessToken) {
          // update global token
          setCurrentAccessToken(newAccessToken)

          processQueue(null, newAccessToken)

          // Retry the original request
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosInstance(originalRequest)
        } else {
          throw new Error('Failed to refresh token')
        }
      } catch (refreshError) {
        console.error('❌ Error refreshing token:', refreshError)
        processQueue(refreshError, null)

        setCurrentAccessToken(null)

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
