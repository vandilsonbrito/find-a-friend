import { Age, Prisma, PrismaClient } from '@prisma/client'
import { normalizeCityName } from 'src/utils/normalizeCityName'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  const orgs = [
    {
      id: randomUUID(),
      name: 'Amigos dos Animais',
      description: 'ONG dedicada ao resgate e adoção de animais.',
      email: 'contato@amigos.org',
      password_hash: 'senha123',
      whatsapp: '11999990001',
      address: 'Rua das Flores, 123',
      city: normalizeCityName('São Paulo'),
      state: 'SP',
      cep: '01001000',
    },
    {
      id: randomUUID(),
      name: 'Patas Felizes',
      description: 'Acolhimento e adoção de cães e gatos.',
      email: 'contato@patasfelizes.org',
      password_hash: 'senha123',
      whatsapp: '11999990002',
      address: 'Avenida Central, 456',
      city: normalizeCityName('Rio de Janeiro'),
      state: 'RJ',
      cep: '20040002',
    },
    {
      id: randomUUID(),
      name: 'Mundo Animal',
      description: 'Cuidando dos animais que precisam de um lar.',
      email: 'contato@mundoanimal.org',
      password_hash: 'senha123',
      whatsapp: '11999990003',
      address: 'Rua dos Bichos, 789',
      city: normalizeCityName('Curitiba'),
      state: 'PR',
      cep: '80010030',
    },
    {
      id: randomUUID(),
      name: 'SOS Pet',
      description: 'Resgate de animais em situação de risco.',
      email: 'contato@sospet.org',
      password_hash: 'senha123',
      whatsapp: '11999990004',
      address: 'Rua Solidária, 321',
      city: normalizeCityName('Belo Horizonte'),
      state: 'MG',
      cep: '30120010',
    },
    {
      id: randomUUID(),
      name: 'Anjos de Patas',
      description: 'ONG dedicada ao bem-estar dos animais.',
      email: 'contato@anjosdepatas.org',
      password_hash: 'senha123',
      whatsapp: '11999990005',
      address: 'Avenida Amor Animal, 654',
      city: normalizeCityName('Porto Alegre'),
      state: 'RS',
      cep: '90040020',
    },
  ]

  await prisma.org.createMany({ data: orgs })

  console.log('✅ Orgs created')

  const pets: Prisma.PetUncheckedCreateInput[] = [
    {
      id: randomUUID(),
      org_id: orgs[0].id,
      name: 'Rex',
      description: 'Cachorro brincalhão e amoroso.',
      age: Age.adult,
      size: 'medium',
      energy_level: 'high',
      independence_level: 'medium',
      environment: 'medium',
      breed: 'SRD',
      sex: 'male',
      type: 'dog',
      city: normalizeCityName('São Paulo'),
    },
    {
      id: randomUUID(),
      org_id: orgs[0].id,
      name: 'Luna',
      description: 'Gatinha carinhosa e muito sociável.',
      age: Age.puppy,
      size: 'small',
      energy_level: 'medium',
      independence_level: 'low',
      environment: 'small',
      breed: 'Persa',
      sex: 'female',
      type: 'cat',
      city: normalizeCityName('São Paulo'),
    },
    {
      id: randomUUID(),
      org_id: orgs[1].id,
      name: 'Toby',
      description: 'Cão muito dócil, adora passeios.',
      age: Age.adult,
      size: 'large',
      energy_level: 'high',
      independence_level: 'high',
      environment: 'large',
      breed: 'Labrador',
      sex: 'male',
      type: 'dog',
      city: normalizeCityName('Rio de Janeiro'),
    },
    {
      id: randomUUID(),
      org_id: orgs[1].id,
      name: 'Mia',
      description: 'Gatinha esperta e muito ágil.',
      age: Age.adult,
      size: 'small',
      energy_level: 'high',
      independence_level: 'medium',
      environment: 'medium',
      breed: 'Siamês',
      sex: 'female',
      type: 'cat',
      city: normalizeCityName('Rio de Janeiro'),
    },
    {
      id: randomUUID(),
      org_id: orgs[2].id,
      name: 'Spike',
      description: 'Cão de guarda, muito atento.',
      age: Age.senior,
      size: 'large',
      energy_level: 'medium',
      independence_level: 'high',
      environment: 'large',
      breed: 'Pastor Alemão',
      sex: 'male',
      type: 'dog',
      city: normalizeCityName('Curitiba'),
    },
    {
      id: randomUUID(),
      org_id: orgs[2].id,
      name: 'Nina',
      description: 'Gatinha brincalhona.',
      age: Age.puppy,
      size: 'small',
      energy_level: 'high',
      independence_level: 'low',
      environment: 'small',
      breed: 'SRD',
      sex: 'female',
      type: 'cat',
      city: normalizeCityName('Curitiba'),
    },
    {
      id: randomUUID(),
      org_id: orgs[3].id,
      name: 'Mel',
      description: 'Gatinha dócil e tranquila.',
      age: Age.senior,
      size: 'small',
      energy_level: 'low',
      independence_level: 'medium',
      environment: 'small',
      breed: 'Angorá',
      sex: 'female',
      type: 'cat',
      city: normalizeCityName('Belo Horizonte'),
    },
    {
      id: randomUUID(),
      org_id: orgs[3].id,
      name: 'Thor',
      description: 'Cachorro enérgico e leal.',
      age: Age.adult,
      size: 'large',
      energy_level: 'high',
      independence_level: 'high',
      environment: 'large',
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      city: normalizeCityName('Belo Horizonte'),
    },
    {
      id: randomUUID(),
      org_id: orgs[4].id,
      name: 'Max',
      description: 'Cachorro muito brincalhão.',
      age: Age.puppy,
      size: 'medium',
      energy_level: 'high',
      independence_level: 'medium',
      environment: 'medium',
      breed: 'SRD',
      sex: 'male',
      type: 'dog',
      city: normalizeCityName('Porto Alegre'),
    },
    {
      id: randomUUID(),
      org_id: orgs[4].id,
      name: 'Sasha',
      description: 'Gatinha meiga e carente.',
      age: Age.adult,
      size: 'small',
      energy_level: 'medium',
      independence_level: 'low',
      environment: 'small',
      breed: 'Persa',
      sex: 'female',
      type: 'cat',
      city: normalizeCityName('Porto Alegre'),
    },
  ]

  await prisma.pet.createMany({ data: pets })

  console.log('✅ Pets created')

  console.log('🌱 Seed finished successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
