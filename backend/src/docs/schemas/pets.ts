import { z } from 'zod'

export const registerPetBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  age: z.enum(['puppy', 'adult', 'senior']),
  size: z.enum(['small', 'medium', 'large']),
  energy_level: z.enum(['low', 'medium', 'high']),
  independence_level: z.enum(['low', 'medium', 'high']),
  environment: z.enum(['small', 'medium', 'large']),
  sex: z.enum(['male', 'female']),
  type: z.enum(['dog', 'cat']),
  breed: z.string(),
  city: z.string(),
  state: z.string(),
  org_id: z.string().uuid(),
})

export const getAvailablePetsForAdoptionQuerySchema = z.object({
  city: z.string().optional(),
  age: z.enum(['puppy', 'adult', 'senior']).optional(),
  size: z.enum(['small', 'medium', 'large']).optional(),
  energy_level: z.enum(['low', 'medium', 'high']).optional(),
  independence_level: z.enum(['low', 'medium', 'high']).optional(),
  environment: z.enum(['small', 'medium', 'large']).optional(),
  sex: z.enum(['male', 'female']).optional(),
  type: z.enum(['dog', 'cat']).optional(),
  page: z.coerce.number().optional().default(1),
})

export const PetResponseSchema = {
  pets: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        age: { type: 'string', enum: ['puppy', 'adult', 'senior'] },
        size: { type: 'string', enum: ['small', 'medium', 'large'] },
        energy_level: {
          type: 'string',
          enum: ['low', 'medium', 'high']
        },
        independence_level: {
          type: 'string',
          enum: ['low', 'medium', 'high']
        },
        environment: {
          type: 'string',
          enum: ['small', 'medium', 'large']
        },
        sex: { type: 'string', enum: ['male', 'female'] },
        type: { type: 'string', enum: ['dog', 'cat'] },
        breed: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        photos: { type: 'array', items: { type: 'string' } },
        is_adopted: { type: 'boolean' },
        org_id: { type: 'string' },
        created_at: { type: 'string' }
      },
      additionalProperties: true,
    }
  }
}
