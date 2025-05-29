import type { OrgFromAPI } from '../@types'
import axiosInstance from '../axios'

export async function getMeService() {
  try {
    const orgData = await axiosInstance.get<OrgFromAPI>('/me')
    return orgData
  } catch (error: any) {
    console.error('Error fetching org:', error)
    throw error
  }
}

