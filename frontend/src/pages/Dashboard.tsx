import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import StatsCards from '../components/dashboard/StatsCards'
import PetCard from '../components/dashboard/PetCard'
import AddPetDialog, { type NewPet } from '../components/dashboard/AddPetDialog'
import OrganizationProfile from '../components/dashboard/OrganizationProfile'
import EmptyPetsState from '../components/dashboard/EmptyPetsState'

const mockPets = [
  {
    id: '1',
    name: 'Max',
    type: 'Cachorro',
    breed: 'Golden Retriever',
    age: '2 anos',
    size: 'Grande',
    gender: 'Macho',
    status: 'Disponível',
    description: 'Max é um cão muito carinhoso e brincalhão.',
    photos: ['/placeholder.svg'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Luna',
    type: 'Gato',
    breed: 'Siamês',
    age: '1 ano',
    size: 'Pequeno',
    gender: 'Fêmea',
    status: 'Adotado',
    description: 'Luna é uma gatinha muito carinhosa.',
    photos: ['/placeholder.svg'],
    createdAt: '2024-02-01',
  },
]

const Dashboard: React.FC = () => {
  const [pets, setPets] = useState(mockPets)
  const [isAddingPet, setIsAddingPet] = useState(false)
  const [newPet, setNewPet] = useState<NewPet>({
    name: '',
    type: '',
    breed: '',
    age: '',
    size: '',
    gender: '',
    description: '',
    photos: [],
  })

  const handleAddPet = () => {
    const pet = {
      id: Date.now().toString(),
      ...newPet,
      status: 'Disponível',
      photos: ['/placeholder.svg'],
      createdAt: new Date().toISOString().split('T')[0],
      views: 0,
      favorites: 0,
    }
    setPets([...pets, pet])
    setNewPet({
      name: '',
      type: '',
      breed: '',
      age: '',
      size: '',
      gender: '',
      description: '',
      photos: [],
    })
    setIsAddingPet(false)
  }

  const handleDeletePet = (petId: string) => {
    setPets(pets.filter((pet) => pet.id !== petId))
  }

  const totalPets = pets.length
  const availablePets = pets.filter((pet) => pet.status === 'Disponível').length
  const adoptedPets = pets.filter((pet) => pet.status === 'Adotado').length

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="heading-1 mb-2">Dashboard da Organização</h1>
            <p className="text-foreground/70">Gerencie seus pets para adoção</p>
          </div>

          <StatsCards
            totalPets={totalPets}
            availablePets={availablePets}
            adoptedPets={adoptedPets}
          />

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
                />
              </div>

              {pets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pets.map((pet) => (
                    <PetCard
                      key={pet.id}
                      pet={pet}
                      onDelete={handleDeletePet}
                    />
                  ))}
                </div>
              ) : (
                <EmptyPetsState onAddPet={() => setIsAddingPet(true)} />
              )}
            </TabsContent>

            <TabsContent value="profile">
              <OrganizationProfile />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
