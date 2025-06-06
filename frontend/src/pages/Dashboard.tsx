'use client'

import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import StatsCards from '../components/dashboard/StatsCards'
import PetCard from '../components/dashboard/PetCard'
import AddPetDialog, {
  type PetType,
} from '../components/dashboard/AddPetDialog'
import OrganizationProfile from '../components/dashboard/OrganizationProfile'
import EmptyPetsState from '../components/dashboard/EmptyPetsState'
import useAuthContext from '../hooks/useAuthContext'
import { ErrorToast } from '../components/ErrorToast'
import { SuccessToast } from '../components/SuccessToast'
import { useGetOrgPets } from '../services/hooks/useGetOrgPets'
import PetSkeletonCardShimmer from '../components/dashboard/SkeletonLoadingPetCard'
import StatsSkeleton from '../components/dashboard/SkeletonLoadingStatsCard'
import { petService } from '../services/petService'
import type {
  AgePT,
  EnergyLevelPT,
  EnvironmentPT,
  IndependenceLevelPT,
  SexPT,
  SizePT,
  TypePT,
} from '../@types'
import { motion } from 'framer-motion'

export interface NewPet {
  name: string
  description: string
  age: AgePT
  size: SizePT
  sex: SexPT
  energy_level: EnergyLevelPT
  independence_level: IndependenceLevelPT
  environment: EnvironmentPT
  type: TypePT
  breed: string
  city: string
  state: string
  photos: string[]
  is_adopted: boolean
}

const Dashboard = () => {
  const { user } = useAuthContext()

  const {
    data: petsData,
    refetch,
    isError,
    isFetching,
  } = useGetOrgPets(user?.id as string)

  const [isAddingPet, setIsAddingPet] = useState(false)
  const [isAddingPetLoading, setIsAddingPetLoading] = useState(false)
  const [selectedPetIdToEdit, setSelectedPetIdToEdit] = useState('')

  const [newPet, setNewPet] = useState<NewPet>({
    name: '',
    description: '',
    age: 'Filhote',
    size: 'Pequeno',
    sex: 'Macho',
    energy_level: 'Baixo',
    independence_level: 'Baixo',
    environment: 'Pequeno',
    type: 'Cachorro',
    breed: '',
    city: '',
    state: '',
    photos: [],
    is_adopted: false,
  })

  const handleAddPet = async (): Promise<boolean> => {
    try {
      setIsAddingPetLoading(true)
      const response = await petService.addPet(newPet, user?.id as string)
      if (response.status === 201) {
        SuccessToast('Pet adicionado com sucesso!')
        refetch()
        resetForm()
        return true
      } else {
        ErrorToast('Erro ao adicionar pet.')
        return false
      }
    } catch (error) {
      ErrorToast('Erro ao adicionar pet.')
      console.error(error)
      return false
    } finally {
      setIsAddingPetLoading(false)
    }
  }

  const handleEditPet = async (
    petId: string,
    changes: Partial<PetType>,
  ): Promise<boolean> => {
    try {
      if (Object.keys(changes).length === 0) {
        console.log('Nenhuma alteração para enviar')
        return true
      }

      const response = await petService.editPet(petId, changes)
      if (response.status === 200) {
        SuccessToast('Pet editado com sucesso!')
        refetch()
        setIsAddingPet(false)
        return true
      } else {
        ErrorToast('Erro ao editar pet.')
        return false
      }
    } catch (error) {
      ErrorToast('Erro ao editar pet.')
      console.error(error)
      return false
    }
  }

  const handleDeletePet = async (petId: string) => {
    try {
      await petService.deletePet(petId)
      SuccessToast('Pet excluído com sucesso!')
      refetch()
    } catch (error) {
      ErrorToast('Erro ao excluir pet.')
      console.error(error)
    }
  }

  const resetForm = () => {
    setNewPet({
      name: '',
      description: '',
      age: 'Filhote',
      size: 'Pequeno',
      sex: 'Macho',
      energy_level: 'Baixo',
      independence_level: 'Baixo',
      environment: 'Pequeno',
      type: 'Cachorro',
      breed: '',
      city: '',
      state: '',
      photos: [],
      is_adopted: false,
    })
    setIsAddingPet(false)
    setSelectedPetIdToEdit('')
  }

  const totalPets = petsData?.length || 0
  const availablePets = petsData?.filter((pet) => !pet.is_adopted).length || 0
  const adoptedPets = petsData?.filter((pet) => pet.is_adopted).length || 0

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Erro ao carregar pets</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <motion.main
        transition={{ duration: 0.8, ease: 'easeOut' }}
        initial={{ y: 30, scale: 1, opacity: 0.7 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        className="flex-1 py-8"
      >
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="heading-1 mb-2">Dashboard da Organização</h1>
            <p className="text-foreground/70">Gerencie seus pets para adoção</p>
          </div>

          {isFetching && <StatsSkeleton />}
          {petsData && (
            <StatsCards
              totalPets={totalPets}
              availablePets={availablePets}
              adoptedPets={adoptedPets}
            />
          )}

          <Tabs defaultValue="pets" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pets">Meus Pets</TabsTrigger>
              <TabsTrigger value="profile">Perfil da Organização</TabsTrigger>
            </TabsList>

            <TabsContent value="pets" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Pets Cadastrados</h2>

                <AddPetDialog
                  isOpen={isAddingPet}
                  onOpenChange={setIsAddingPet}
                  newPet={newPet}
                  setNewPet={setNewPet}
                  onAddPet={handleAddPet}
                  onEdit={handleEditPet}
                  isaddingPetLoading={isAddingPetLoading}
                  selectedPetIdToEdit={selectedPetIdToEdit}
                  setSelectedPetIdToEdit={setSelectedPetIdToEdit}
                />
              </div>

              {isFetching && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <PetSkeletonCardShimmer key={index} />
                  ))}
                </div>
              )}

              {petsData && petsData.length > 0 ? (
                <motion.div
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  initial={{ y: 30, scale: 1, opacity: 0.7 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {petsData.map((pet) => (
                    <PetCard
                      key={pet.id}
                      pet={pet}
                      orgId={user?.id as string}
                      onDelete={handleDeletePet}
                      setIsAddingPet={setIsAddingPet}
                      setSelectedPetIdToEdit={setSelectedPetIdToEdit}
                    />
                  ))}
                </motion.div>
              ) : (
                <EmptyPetsState onAddPet={() => setIsAddingPet(true)} />
              )}
            </TabsContent>

            <TabsContent value="profile">
              <motion.div
                transition={{ duration: 0.8, ease: 'easeOut' }}
                initial={{ y: 30, scale: 1, opacity: 0.7 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                className=""
              >
                <OrganizationProfile />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}

export default Dashboard
