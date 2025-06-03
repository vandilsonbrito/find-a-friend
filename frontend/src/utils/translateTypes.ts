const petInfo = {
  type: {
    dog: 'Cachorro',
    cat: 'Gato',
  },
  age: {
    puppy: 'Filhote',
    adult: 'Adulto',
    senior: 'Idoso',
  },
  size: {
    small: 'Pequeno',
    medium: 'Médio',
    large: 'Grande',
  },
  sex: {
    male: 'Macho',
    female: 'Fêmea',
  },
  energy_level: {
    low: 'Baixo',
    medium: 'Médio',
    high: 'Alto',
  },
  independence_level: {
    low: 'Baixo',
    medium: 'Médio',
    high: 'Alto',
  },
  environment: {
    small: 'Pequeno',
    medium: 'Médio',
    large: 'Amplo',
  },
} as const

export function translateToPT<T extends keyof typeof petInfo>(
  category: T,
  value: keyof (typeof petInfo)[T],
): (typeof petInfo)[T][keyof (typeof petInfo)[T]] | undefined {
  return petInfo[category][value]
}

export function translateToEN<T extends keyof typeof petInfo>(
  category: T,
  valuePT: (typeof petInfo)[T][keyof (typeof petInfo)[T]],
): keyof (typeof petInfo)[T] | undefined {
  const entry = Object.entries(petInfo[category]).find(([, v]) => v === valuePT)
  return entry ? (entry[0] as keyof (typeof petInfo)[T]) : undefined
}
