import { z } from 'zod'

export const TypePTSchema = z.enum(['Cachorro', 'Gato'])
export const AgePTSchema = z.enum(['Filhote', 'Adulto', 'Idoso'])
export const SizePTSchema = z.enum(['Pequeno', 'Médio', 'Grande'])
export const SexPTSchema = z.enum(['Macho', 'Fêmea'])
export const EnergyLevelPTSchema = z.enum(['Baixo', 'Médio', 'Alto'])
export const IndependenceLevelPTSchema = z.enum(['Baixo', 'Médio', 'Alto'])
export const EnvironmentPTSchema = z.enum(['Pequeno', 'Médio', 'Amplo'])

export const petSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  
  type: TypePTSchema.refine(val => val !== undefined, {
    message: 'Tipo é obrigatório'
  }),
  
  breed: z.string()
    .min(1, 'Raça é obrigatória')
    .max(30, 'Raça deve ter no máximo 30 caracteres'),
  
  age: AgePTSchema.refine(val => val !== undefined, {
    message: 'Idade é obrigatória'
  }),
  
  size: SizePTSchema.refine(val => val !== undefined, {
    message: 'Porte é obrigatório'
  }),
  
  sex: SexPTSchema.refine(val => val !== undefined, {
    message: 'Sexo é obrigatório'
  }),
  
  energy_level: EnergyLevelPTSchema.refine(val => val !== undefined, {
    message: 'Nível de energia é obrigatório'
  }),
  
  independence_level: IndependenceLevelPTSchema.refine(val => val !== undefined, {
    message: 'Nível de independência é obrigatório'
  }),
  
  environment: EnvironmentPTSchema.refine(val => val !== undefined, {
    message: 'Ambiente é obrigatório'
  }),
  
  city: z.string()
    .min(1, 'Cidade é obrigatória')
    .max(50, 'Cidade deve ter no máximo 50 caracteres'),

  state: z.string()
    .min(2, 'Estado é obrigatório')
    .max(2, 'Estado deve ser no formato AA'),
  
  description: z.string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  
  photos: z.array(z.string())
    .min(1, 'Pelo menos uma foto é obrigatória')
    .max(5, 'Máximo de 5 fotos permitidas')
})

export const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(5 * 1024 * 1024, 'Arquivo deve ter no máximo 5MB'),
  type: z.string().refine(
    (type) => type.startsWith('image/'),
    'Arquivo deve ser uma imagem'
  )
})

export type PetFormData = z.infer<typeof petSchema> 
export type FileData = z.infer<typeof fileSchema>

export const validatePetForm = (data: any) => {
  try {
    petSchema.parse(data)
    return { success: true, errors: {} }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        errors[path] = err.message
      })
      return { success: false, errors }
    }
    return { success: false, errors: { general: 'Erro de validação' } }
  }
}

export const validateFile = (file: File) => {
  try {
    fileSchema.parse({
      name: file.name,
      size: file.size,
      type: file.type
    })
    return null
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message
    }
    return 'Erro na validação do arquivo'
  }
}