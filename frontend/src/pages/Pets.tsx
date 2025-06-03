import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import PetCard from '../components/pets/PetsCard'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Search, Filter, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { useGetAvailablePets } from '../services/hooks/useGetAvailablePets'

const Pets: React.FC = () => {

  const { data: petsData } = useGetAvailablePets()

  const [city, setCity] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    age: '',
    size: '',
    energy: '',
    independence: '',
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Lógica de chamada para a API com os filtros aplicados
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

  useEffect(() => {
    window.scrollTo(0, 0)
  })

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
              {petsData && petsData.length} pets encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {petsData && petsData.map((pet) => (
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
