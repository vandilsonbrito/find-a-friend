import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Plus } from 'lucide-react'
import { validatePetForm, type PetFormData } from '../../utils/petValidations'
import PetForm from './PetForm'
import useAuthContext from '../../hooks/useAuthContext'
import { useGetOrgPets } from '../../services/hooks/useGetOrgPets'

export type PetType = PetFormData & {
  is_adopted: boolean
}

interface AddPetDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  newPet: PetType
  setNewPet: React.Dispatch<React.SetStateAction<PetType>>
  onAddPet: () => Promise<boolean>
  onEdit: (petId: string, pet: PetType) => Promise<boolean>
  selectedPetIdToEdit: string
  isaddingPetLoading: boolean
  setSelectedPetIdToEdit: (isaddingPetLoading: string) => void
}

const AddPetDialog: React.FC<AddPetDialogProps> = ({
  isOpen,
  onOpenChange,
  newPet,
  setNewPet,
  onAddPet,
  onEdit,
  selectedPetIdToEdit,
  isaddingPetLoading,
  setSelectedPetIdToEdit
}) => {
  const { user } = useAuthContext()
  const { data: petsData } = useGetOrgPets(user?.id as string)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const modalTitle = selectedPetIdToEdit ? 'Editar Pet' : 'Adicionar Pet'
  const buttonText = selectedPetIdToEdit ? 'Salvar Edição' : 'Adicionar Pet'
  const petToEdit = petsData?.find((pet) => pet.id === selectedPetIdToEdit)

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
    if (!open) {
      setSelectedPetIdToEdit('')
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
      setErrors({})
    }
  }

  const handleErrorChange = (field: string, error?: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[field] = error
      } else {
        delete newErrors[field]
      }
      return newErrors
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validatePetForm(newPet)
    if (!validation.success) {
      setErrors(validation.errors)

      const firstErrorField = Object.keys(validation.errors)[0]
      const element = document.getElementById(firstErrorField)
      if (element) {
        element.focus()
      }
      return
    }

    setErrors({})
        
    if(selectedPetIdToEdit) {
      const response = onEdit(selectedPetIdToEdit, newPet)
      if(await response) {
        handleOpenChange(false)
        return
      }
    }
    const response = await onAddPet()
    if(response) {
      handleOpenChange(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {modalTitle}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {isaddingPetLoading && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
              <span className="ml-2 text-brand-500">Carregando...</span>
            </div>
          </div>
        )}

        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            Preencha as informações do pet para disponibilizá-lo para adoção.
          </DialogDescription>
        </DialogHeader>

        <PetForm
          pet={newPet}
          setPet={setNewPet}
          errors={errors}
          onErrorChange={handleErrorChange}
          onSubmit={handleSubmit}
          petToEdit={petToEdit}
        />

        <div className="flex justify-end gap-3 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isaddingPetLoading}>{buttonText}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddPetDialog