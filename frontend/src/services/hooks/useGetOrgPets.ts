import { useQuery } from '@tanstack/react-query'
import type { PetFromAPI } from '../../@types'
import axiosInstance from '../../axios'

type PetsDataFromAPI = {
  pets: PetFromAPI[]
}

export function useGetOrgPets(orgId: string) {
  async function getOrgPets() {
    const response = await axiosInstance.get<PetsDataFromAPI>(
      `/orgs/${orgId}/pets`,
    )
    const data: PetFromAPI[] = response.data.pets
    return data || []
  }

  return useQuery({
    queryKey: ['pets', orgId],
    queryFn: getOrgPets,
    enabled: !!orgId,
    refetchOnMount: true,
  })
}
