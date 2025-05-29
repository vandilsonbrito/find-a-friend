export interface OrgFromAPI {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    address: string;
    city: string;
    state: string;
    cep: string;
    pets: PetFromAPI[];
    createdAt: string;
}

export interface PetFromAPI {
    id: string;
    name: string;
    description: string;
    age: Age;
    size: Size;
    sex: Sex;
    energy_level: EnergyLevel;
    independence_level: IndependenceLevel;
    environment: Environment;
    type: Type;
    breed: string;
    photos: string[];
    createdAt: string;
}

type Age = 'puppy' | 'adult' | 'senior';
type Size = 'small' | 'medium' | 'large';
type EnergyLevel = 'low' | 'medium' | 'high';
type IndependenceLevel = 'low' | 'medium' | 'high';
type Environment = 'small' | 'medium' | 'large';
type Sex = 'male' | 'female';
type Type = 'dog' | 'cat';
 