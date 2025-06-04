import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { UploadCloud, X } from 'lucide-react'
import type {
  AgePT,
  EnergyLevelPT,
  EnvironmentPT,
  IndependenceLevelPT,
  PetFromAPI,
  SexPT,
  SizePT,
  TypePT,
} from '../../@types'
import { validateFile, type PetFormData } from '../../utils/petValidations'
import { translateToPT } from '../../utils/translateTypes'

type PetType = PetFormData & {
  is_adopted: boolean
}

interface PetFormProps {
  pet: PetType
  setPet: React.Dispatch<React.SetStateAction<PetType>>
  errors: Record<string, string>
  onErrorChange: (field: string, error?: string) => void
  onSubmit: (e: React.FormEvent) => void
  petToEdit?: PetFromAPI
}

const PetForm: React.FC<PetFormProps> = ({
  pet,
  setPet,
  errors,
  onErrorChange,
  onSubmit,
  petToEdit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileError, setFileError] = useState<string>('')

  useEffect(() => {
    if (petToEdit) {
      handleInputChange('name', petToEdit.name)
      handleInputChange('description', petToEdit.description)
      handleInputChange('type', translateToPT('type', petToEdit.type))
      handleInputChange('age', translateToPT('age', petToEdit.age))
      handleInputChange('size', translateToPT('size', petToEdit.size))
      handleInputChange(
        'energy_level',
        translateToPT('energy_level', petToEdit.energy_level),
      )
      handleInputChange(
        'independence_level',
        translateToPT('independence_level', petToEdit.independence_level),
      )
      handleInputChange(
        'environment',
        translateToPT('environment', petToEdit.environment),
      )
      handleInputChange('sex', translateToPT('sex', petToEdit.sex))
      handleInputChange('breed', petToEdit.breed)
      handleInputChange('city', petToEdit.city)
      handleInputChange('state', petToEdit.state)
      handleInputChange('photos', petToEdit.photos)
      handleInputChange('is_adopted', petToEdit.is_adopted)
    }
  }, [petToEdit])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validationError = validateFile(file)
      if (validationError) {
        setFileError(validationError)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPet((prev) => ({
          ...prev,
          photos: [reader.result as string],
        }))
        setFileError('')
        onErrorChange('photos')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPet((prev) => ({ ...prev, photos: [] }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onErrorChange('photos', 'Pelo menos uma foto é obrigatória')
  }

  const handleInputChange = (
    field: keyof PetFormData | 'is_adopted',
    value: any,
  ) => {
    setPet((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      onErrorChange(field)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex-1 overflow-y-auto pr-2 -mr-2">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {petToEdit && (
            <div className="space-y-2 p-3 rounded-lg border-l-4 border-l-orange-500 bg-orange-50/30 shadow-sm">
              <Label htmlFor="is_adopted" className="">
                Adotado
              </Label>
              <Select
                value={pet.is_adopted ? 'sim' : 'nao'}
                onValueChange={(value: string) =>
                  handleInputChange('is_adopted', value === 'sim')
                }
              >
                <SelectTrigger
                  className={errors.is_adopted ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao">Não</SelectItem>
                  <SelectItem value="sim">Sim</SelectItem>
                </SelectContent>
              </Select>
              {errors.is_adopted && (
                <p className="text-sm text-red-500">{errors.is_adopted}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={pet.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Nome do pet"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={pet.type}
              onValueChange={(value: TypePT) =>
                handleInputChange('type', value)
              }
            >
              <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cachorro">Cachorro</SelectItem>
                <SelectItem value="Gato">Gato</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="breed">Raça</Label>
            <Input
              id="breed"
              value={pet.breed}
              onChange={(e) => handleInputChange('breed', e.target.value)}
              placeholder="Raça do pet"
              className={errors.breed ? 'border-red-500' : ''}
            />
            {errors.breed && (
              <p className="text-sm text-red-500">{errors.breed}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Idade</Label>
            <Select
              value={pet.age}
              onValueChange={(value: AgePT) => handleInputChange('age', value)}
            >
              <SelectTrigger className={errors.age ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione a idade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Filhote">Filhote</SelectItem>
                <SelectItem value="Adulto">Adulto</SelectItem>
                <SelectItem value="Idoso">Idoso</SelectItem>
              </SelectContent>
            </Select>
            {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Porte</Label>
            <Select
              value={pet.size}
              onValueChange={(value: SizePT) =>
                handleInputChange('size', value)
              }
            >
              <SelectTrigger className={errors.size ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione o porte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pequeno">Pequeno</SelectItem>
                <SelectItem value="Médio">Médio</SelectItem>
                <SelectItem value="Grande">Grande</SelectItem>
              </SelectContent>
            </Select>
            {errors.size && (
              <p className="text-sm text-red-500">{errors.size}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sex">Sexo</Label>
            <Select
              value={pet.sex}
              onValueChange={(value: SexPT) => handleInputChange('sex', value)}
            >
              <SelectTrigger className={errors.sex ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione o sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Macho">Macho</SelectItem>
                <SelectItem value="Fêmea">Fêmea</SelectItem>
              </SelectContent>
            </Select>
            {errors.sex && <p className="text-sm text-red-500">{errors.sex}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="energy_level">Nível de Energia</Label>
            <Select
              value={pet.energy_level}
              onValueChange={(value: EnergyLevelPT) =>
                handleInputChange('energy_level', value)
              }
            >
              <SelectTrigger
                className={errors.energy_level ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baixo">Baixo</SelectItem>
                <SelectItem value="Médio">Médio</SelectItem>
                <SelectItem value="Alto">Alto</SelectItem>
              </SelectContent>
            </Select>
            {errors.energy_level && (
              <p className="text-sm text-red-500">{errors.energy_level}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="independence_level">Nível de Independência</Label>
            <Select
              value={pet.independence_level}
              onValueChange={(value: IndependenceLevelPT) =>
                handleInputChange('independence_level', value)
              }
            >
              <SelectTrigger
                className={errors.independence_level ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baixo">Baixo</SelectItem>
                <SelectItem value="Médio">Médio</SelectItem>
                <SelectItem value="Alto">Alto</SelectItem>
              </SelectContent>
            </Select>
            {errors.independence_level && (
              <p className="text-sm text-red-500">
                {errors.independence_level}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="environment">Ambiente</Label>
            <Select
              value={pet.environment}
              onValueChange={(value: EnvironmentPT) =>
                handleInputChange('environment', value)
              }
            >
              <SelectTrigger
                className={errors.environment ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Selecione o ambiente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pequeno">Pequeno</SelectItem>
                <SelectItem value="Médio">Médio</SelectItem>
                <SelectItem value="Amplo">Amplo</SelectItem>
              </SelectContent>
            </Select>
            {errors.environment && (
              <p className="text-sm text-red-500">{errors.environment}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              value={pet.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Cidade onde está o pet"
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              value={pet.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="Estado onde está o pet"
              className={errors.state ? 'border-red-500' : ''}
            />
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={pet.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Conte um pouco sobre a personalidade do pet..."
            rows={3}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Foto do Pet</Label>
          {pet.photos.length === 0 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50 ${
                errors.photos || fileError
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            >
              <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500">
                Clique para enviar uma imagem (até 5MB)
              </p>
            </div>
          ) : (
            <div className="relative w-40">
              <img
                src={pet.photos[0]}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
          {(errors.photos || fileError) && (
            <p className="text-sm text-red-500">{errors.photos || fileError}</p>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </form>
  )
}

export default PetForm
