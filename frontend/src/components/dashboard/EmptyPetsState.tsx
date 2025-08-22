import React from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Plus } from 'lucide-react'

interface EmptyPetsStateProps {
  onAddPet: () => void
}

const EmptyPetsState: React.FC<EmptyPetsStateProps> = ({ onAddPet }) => {
  return (
    <div className="text-center py-12">
      <div className="text-foreground/40 mb-4">
        <Heart className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-lg font-medium mb-2">Nenhum pet cadastrado</h3>
      <p className="text-foreground/70 mb-4">
        Comece adicionando seu primeiro pet para adoção.
      </p>
      <Button onClick={onAddPet}>
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Pet
      </Button>
    </div>
  )
}

export default EmptyPetsState
