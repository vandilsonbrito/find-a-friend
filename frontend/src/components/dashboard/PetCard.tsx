import React from 'react'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Badge } from '../ui/badge'
import { Edit2, Trash2, Calendar } from 'lucide-react'
import type { PetFromAPI } from '../../@types'
import { translateToPT } from '../../utils/translateTypes'

interface PetCardProps {
  pet: PetFromAPI
  orgId: string
  onDelete: (petId: string) => void
  setIsAddingPet: (value: boolean) => void
  setSelectedPetIdToEdit: (petId: string) => void
}

const PetCard: React.FC<PetCardProps> = ({ pet, onDelete, setIsAddingPet, setSelectedPetIdToEdit }) => {
  const formattedPet = {
    id: pet.id,
    name: pet.name,
    description: pet.description,
    age: translateToPT('age', pet.age),
    size: translateToPT('size', pet.size),
    sex: translateToPT('sex', pet.sex),
    energy_level: translateToPT('energy_level', pet.energy_level),
    independence_level: translateToPT(
      'independence_level',
      pet.independence_level,
    ),
    environment: translateToPT('environment', pet.environment),
    type: translateToPT('type', pet.type),
    breed: pet.breed,
    city: pet.city,
    photos: pet.photos,
    is_adopted: pet.is_adopted,
    createdAt: pet.created_at,
  }

  const getStatusColor = (status: boolean) => {
    switch (status) {
      case false:
        return 'bg-green-100 text-green-800'
      case true:
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="aspect-square rounded-lg bg-secondary mb-3 overflow-hidden">
          <img
            src={formattedPet.photos[0]}
            alt={formattedPet.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{formattedPet.name}</CardTitle>
            <CardDescription>
              {formattedPet.breed} • {formattedPet.age}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(formattedPet.is_adopted)}>
            {formattedPet.is_adopted ? 'Adotado' : 'Disponível'}
          </Badge>{' '}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-foreground/70 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formattedPet.createdAt
              ? new Date(formattedPet.createdAt).toLocaleDateString('pt-BR')
              : 'Data inválida'}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => {
              setIsAddingPet(true)
              setSelectedPetIdToEdit(formattedPet.id)
            }}
            >
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onDelete(formattedPet.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PetCard
