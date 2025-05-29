import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds
})

// 🔑 Armazena o token e o callback de refresh
let currentAccessToken: string | null = null
let refreshTokenCallback: (() => Promise<string | null>) | null = null

// ✅ Setter do access token
export const setCurrentAccessToken = (token: string | null) => {
  currentAccessToken = token
}

// ✅ Setter do callback de refresh token
export const setRefreshTokenCallback = (
  callback: () => Promise<string | null>,
) => {
  refreshTokenCallback = callback
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (currentAccessToken) {
      config.headers.Authorization = `Bearer ${currentAccessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/token/refresh')
    ) {
      originalRequest._retry = true

      try {
        const refreshRes = await axiosInstance.patch('/token/refresh')

        if (refreshRes.status === 200) {
          const newAccessToken = refreshRes.data.accessToken
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${newAccessToken}`
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        console.error('Erro ao renovar token via interceptor', refreshError)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
