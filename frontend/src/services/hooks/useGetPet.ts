import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../axios'
import type { PetFromAPI } from '../../@types'

type GetPetResponse = {
  pet: PetFromAPI
}

export function useGetPet(petId: string) {
  async function getPet() {
    const response = await axiosInstance.get<GetPetResponse>(`/pets/${petId}`)
    const data = response.data
    return data || []
  }

  return useQuery({
    queryKey: ['pet', petId],
    queryFn: getPet,
    enabled: !!petId,
    refetchOnMount: true,
  })
}
