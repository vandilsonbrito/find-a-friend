import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { Textarea } from '../../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { Plus } from 'lucide-react'

export interface NewPet {
  name: string
  type: string
  breed: string
  age: string
  size: string
  gender: string
  description: string
  photos: string[]
}

interface AddPetDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  newPet: NewPet
  setNewPet: (pet: NewPet) => void
  onAddPet: () => void
}

const AddPetDialog: React.FC<AddPetDialogProps> = ({
  isOpen,
  onOpenChange,
  newPet,
  setNewPet,
  onAddPet,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Pet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Pet</DialogTitle>
          <DialogDescription>
            Preencha as informações do pet para disponibilizá-lo para adoção.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={newPet.name}
              onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
              placeholder="Nome do pet"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={newPet.type}
              onValueChange={(value) => setNewPet({ ...newPet, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cachorro">Cachorro</SelectItem>
                <SelectItem value="Gato">Gato</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="breed">Raça</Label>
            <Input
              id="breed"
              value={newPet.breed}
              onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
              placeholder="Raça do pet"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Idade</Label>
            <Input
              id="age"
              value={newPet.age}
              onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
              placeholder="Ex: 2 anos"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Porte</Label>
            <Select
              value={newPet.size}
              onValueChange={(value) => setNewPet({ ...newPet, size: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o porte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pequeno">Pequeno</SelectItem>
                <SelectItem value="Médio">Médio</SelectItem>
                <SelectItem value="Grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Sexo</Label>
            <Select
              value={newPet.gender}
              onValueChange={(value) => setNewPet({ ...newPet, gender: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Macho">Macho</SelectItem>
                <SelectItem value="Fêmea">Fêmea</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={newPet.description}
            onChange={(e) =>
              setNewPet({ ...newPet, description: e.target.value })
            }
            placeholder="Conte um pouco sobre a personalidade do pet..."
            rows={3}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onAddPet}>Adicionar Pet</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddPetDialog
