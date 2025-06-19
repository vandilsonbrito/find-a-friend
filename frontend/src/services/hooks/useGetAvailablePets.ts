import { useQuery } from '@tanstack/react-query'
import type { PetFromAPI } from '../../@types'
import axiosInstance from '../../axios'

type PetsDataFromAPI = {
  pets: PetFromAPI[]
  total_pets: number
  current_page: number
  total_pages: number
}

type PetFilters = {
  city?: string
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
  environment?: string
  type?: string
  sex?: string
  page?: number
}

function buildQueryString(filters: PetFilters): string {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      value !== 'any'
    ) {
      params.append(key, String(value))
    }
  })

  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}

export function useGetAvailablePets(filters: PetFilters = {}) {
  async function getAvailablePets() {
    const queryString = buildQueryString(filters)
    const response = await axiosInstance.get<PetsDataFromAPI>(
      `/pets${queryString}`,
    )
    const data = response.data
    return data || []
  }

  return useQuery({
    queryKey: ['pets', filters],
    queryFn: getAvailablePets,
    refetchOnMount: true,
  })
}
