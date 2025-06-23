import { useQuery } from '@tanstack/react-query'
import type { AllOrgsFromAPI } from '../../@types'
import axiosInstance from '../../axios'

type OrgsDataFromAPI = {
  orgsList: AllOrgsFromAPI[]
  totalOrgs: number
}

export function useGetAllOrgs() {
  async function getAllOrgs() {
    const response = await axiosInstance.get(`/orgs`)
    const data: OrgsDataFromAPI = response.data
    return data || []
  }

  return useQuery({
    queryKey: ['all-orgs'],
    queryFn: getAllOrgs,
    refetchOnMount: true,
  })
}
