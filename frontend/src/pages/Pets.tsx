import React, { useState } from 'react'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import PetCard, { type PetCardProps } from '../components/pets/PetsCard'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/Button'
import { Search, Filter, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'

const Pets: React.FC = () => {
  const [city, setCity] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    age: '',
    size: '',
    energy: '',
    independence: '',
  })

  const petsList: PetCardProps[] = [
    {
      id: '1',
      name: 'Rex',
      type: 'dog',
      image:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'São Paulo',
      state: 'SP',
    },
    {
      id: '2',
      name: 'Luna',
      type: 'cat',
      image:
        'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
    {
      id: '3',
      name: 'Bob',
      type: 'dog',
      image:
        'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Curitiba',
      state: 'PR',
    },
    {
      id: '4',
      name: 'Mia',
      type: 'cat',
      image:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Belo Horizonte',
      state: 'MG',
    },
    {
      id: '5',
      name: 'Max',
      type: 'dog',
      image:
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Brasília',
      state: 'DF',
    },
    {
      id: '6',
      name: 'Simba',
      type: 'cat',
      image:
        'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Salvador',
      state: 'BA',
    },
    {
      id: '7',
      name: 'Thor',
      type: 'dog',
      image:
        'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Florianópolis',
      state: 'SC',
    },
    {
      id: '8',
      name: 'Fifi',
      type: 'cat',
      image:
        'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Recife',
      state: 'PE',
    },
  ]

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // chamada para a API com os filtros aplicados
  }

  const clearFilters = () => {
    setFilters({
      type: '',
      age: '',
      size: '',
      energy: '',
      independence: '',
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary">
        <div className="bg-white py-8 border-b">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h1 className="heading-2 mb-6 text-center">Encontre seu amigo</h1>

              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1">
                  <Label htmlFor="city" className="sr-only">
                    Cidade
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 h-5 w-5" />
                    <Input
                      id="city"
                      placeholder="Digite sua cidade"
                      className="pl-10"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="shrink-0">
                  Buscar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="shrink-0 gap-2"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  {filterOpen ? 'Ocultar Filtros' : 'Filtros'}
                </Button>
              </form>

              {filterOpen && (
                <div className="mt-4 bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Filtrar por</h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-brand-500 hover:underline flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Limpar filtros
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de animal</Label>
                      <Select
                        value={filters.type}
                        onValueChange={(value) =>
                          handleFilterChange('type', value)
                        }
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Todos os tipos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todos os tipos</SelectItem>
                          <SelectItem value="dog">Cachorro</SelectItem>
                          <SelectItem value="cat">Gato</SelectItem>
                          <SelectItem value="other">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Idade</Label>
                      <Select
                        value={filters.age}
                        onValueChange={(value) =>
                          handleFilterChange('age', value)
                        }
                      >
                        <SelectTrigger id="age">
                          <SelectValue placeholder="Qualquer idade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Qualquer idade</SelectItem>
                          <SelectItem value="filhote">Filhote</SelectItem>
                          <SelectItem value="adulto">Adulto</SelectItem>
                          <SelectItem value="idoso">Idoso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size">Tamanho</Label>
                      <Select
                        value={filters.size}
                        onValueChange={(value) =>
                          handleFilterChange('size', value)
                        }
                      >
                        <SelectTrigger id="size">
                          <SelectValue placeholder="Qualquer tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Qualquer tamanho</SelectItem>
                          <SelectItem value="pequeno">Pequeno</SelectItem>
                          <SelectItem value="medio">Médio</SelectItem>
                          <SelectItem value="grande">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="energy">Nível de energia</Label>
                      <Select
                        value={filters.energy}
                        onValueChange={(value) =>
                          handleFilterChange('energy', value)
                        }
                      >
                        <SelectTrigger id="energy">
                          <SelectValue placeholder="Qualquer nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Qualquer nível</SelectItem>
                          <SelectItem value="baixo">Baixo</SelectItem>
                          <SelectItem value="medio">Médio</SelectItem>
                          <SelectItem value="alto">Alto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="independence">Independência</Label>
                      <Select
                        value={filters.independence}
                        onValueChange={(value) =>
                          handleFilterChange('independence', value)
                        }
                      >
                        <SelectTrigger id="independence">
                          <SelectValue placeholder="Qualquer nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Qualquer nível</SelectItem>
                          <SelectItem value="baixo">Baixo</SelectItem>
                          <SelectItem value="medio">Médio</SelectItem>
                          <SelectItem value="alto">Alto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Pets disponíveis para adoção</h2>
            <p className="text-foreground/70">
              {petsList.length} pets encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {petsList.map((pet) => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Pets
