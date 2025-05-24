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

interface Pet {
  id: string
  name: string
  type: string
  breed: string
  age: string
  size: string
  gender: string
  status: string
  description: string
  photos: string[]
  createdAt: string
}

interface PetCardProps {
  pet: Pet
  onDelete: (petId: string) => void
}

const PetCard: React.FC<PetCardProps> = ({ pet, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800'
      case 'Adotado':
        return 'bg-blue-100 text-blue-800'
      case 'Em processo':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="aspect-square rounded-lg bg-secondary mb-3 overflow-hidden">
          <img
            src={pet.photos[0]}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{pet.name}</CardTitle>
            <CardDescription>
              {pet.breed} • {pet.age}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(pet.status)}>{pet.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-foreground/70 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(pet.createdAt).toLocaleDateString('pt-BR')}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onDelete(pet.id)}
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
