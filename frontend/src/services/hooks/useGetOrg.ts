import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../axios'
import type { OrgFromAPI } from '../../@types'

type OrgData = Omit<OrgFromAPI, 'email'>
type GetOrgResponse = {
  org: OrgData
}

export function useGetOrg(orgId: string) {
  async function getOrg() {
    const response = await axiosInstance.get<GetOrgResponse>(`/orgs/${orgId}`)
    const data = response.data
    return data || []
  }

  return useQuery({
    queryKey: ['org', orgId],
    queryFn: getOrg,
    enabled: !!orgId,
    refetchOnMount: true,
  })
}
