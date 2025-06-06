import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import PetCard from '../components/pets/PetsCard'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Search, Filter, X, Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { useGetAvailablePets } from '../services/hooks/useGetAvailablePets'
import type { Age, EnergyLevel, IndependenceLevel, Size, Type } from '../@types'
import { PaginationProgress } from '../components/pets/ProgressBar'
import SkeletonLoadingPetsCard from '../components/pets/PetsCardSkeletonLoading'
import { AnimatePresence, motion } from 'framer-motion'

const Pets: React.FC = () => {
  const [city, setCity] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [allPets, setAllPets] = useState<any[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [filters, setFilters] = useState({
    city: '',
    type: '' as Type,
    age: '' as Age,
    size: '' as Size,
    energy_level: '' as EnergyLevel,
    independence_level: '' as IndependenceLevel,
  })

  const { data: petsData, isLoading } = useGetAvailablePets({
    ...filters,
    page: currentPage,
  })

  useEffect(() => {
    if (petsData?.pets) {
      if (currentPage === 1) {
        setAllPets(petsData.pets)
      } else {
        setAllPets((prev) => [...prev, ...petsData.pets])
      }
      setIsLoadingMore(false)
    }
  }, [petsData, currentPage])

  const isAnyFilterActive =
    filters.city ||
    filters.type ||
    filters.age ||
    filters.size ||
    filters.energy_level ||
    filters.independence_level

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
    setAllPets([])
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, city }))
    setCurrentPage(1)
    setAllPets([])
  }

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCity(value)

    if (value === '') {
      setFilters((prev) => ({ ...prev, city: '' }))
      setCurrentPage(1)
      setAllPets([])
    }
  }

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '' as Type,
      age: '' as Age,
      size: '' as Size,
      energy_level: '' as EnergyLevel,
      independence_level: '' as IndependenceLevel,
    })
    setCity('')
    setCurrentPage(1)
    setAllPets([])
  }

  const handleLoadMore = () => {
    if (petsData && currentPage < petsData.total_pages) {
      setIsLoadingMore(true)
      setCurrentPage((prev) => prev + 1)
    }
  }

  const hasMorePages = petsData && currentPage < petsData.total_pages
  const showProgressBar = petsData && petsData.total_pages > 1
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        transition={{ duration: 0.8, ease: 'easeOut' }}
        initial={{ y: 30, scale: 1, opacity: 0.7 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        className="flex-1 bg-secondary"
      >
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
                      name="city"
                      placeholder="Digite sua cidade"
                      className="pl-10"
                      value={city}
                      onChange={handleCityInputChange}
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
                        value={filters.type || 'all'}
                        onValueChange={(value) =>
                          handleFilterChange(
                            'type',
                            value === 'all' ? '' : value,
                          )
                        }
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Todos os tipos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os tipos</SelectItem>
                          <SelectItem value="dog">Cachorro</SelectItem>
                          <SelectItem value="cat">Gato</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Idade</Label>
                      <Select
                        value={filters.age || 'any'}
                        onValueChange={(value) =>
                          handleFilterChange(
                            'age',
                            value === 'any' ? '' : value,
                          )
                        }
                      >
                        <SelectTrigger id="age">
                          <SelectValue placeholder="Qualquer idade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Qualquer idade</SelectItem>
                          <SelectItem value="puppy">Filhote</SelectItem>
                          <SelectItem value="adult">Adulto</SelectItem>
                          <SelectItem value="senior">Idoso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size">Tamanho</Label>
                      <Select
                        value={filters.size || 'any'}
                        onValueChange={(value) =>
                          handleFilterChange(
                            'size',
                            value === 'any' ? '' : value,
                          )
                        }
                      >
                        <SelectTrigger id="size">
                          <SelectValue placeholder="Qualquer tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Qualquer tamanho</SelectItem>
                          <SelectItem value="small">Pequeno</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="energy_level">Nível de energia</Label>
                      <Select
                        value={filters.energy_level || 'any'}
                        onValueChange={(value) =>
                          handleFilterChange(
                            'energy_level',
                            value === 'any' ? '' : value,
                          )
                        }
                      >
                        <SelectTrigger id="energy_level">
                          <SelectValue placeholder="Qualquer nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Qualquer nível</SelectItem>
                          <SelectItem value="low">Baixo</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="high">Alto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="independence_level">Independência</Label>
                      <Select
                        value={filters.independence_level || 'any'}
                        onValueChange={(value) =>
                          handleFilterChange(
                            'independence_level',
                            value === 'any' ? '' : value,
                          )
                        }
                      >
                        <SelectTrigger id="independence_level">
                          <SelectValue placeholder="Qualquer nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Qualquer nível</SelectItem>
                          <SelectItem value="low">Baixo</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="high">Alto</SelectItem>
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
              {allPets.length} pets encontrados{' '}
              {isAnyFilterActive && 'com os filtros ativados'}
            </p>
          </div>

          {isLoading && currentPage === 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map(() => (
                <SkeletonLoadingPetsCard />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allPets.length > 0 ? (
                allPets.map((pet) => <PetCard key={pet.id} {...pet} />)
              ) : (
                <p className="text-center text-foreground/70 col-span-full">
                  Nenhum pet encontrado com os filtros selecionados.
                </p>
              )}
            </div>
          )}

          <AnimatePresence>
            {hasMorePages && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 0,
                  transition: { duration: 0.1 },
                }}
                className="mt-12 text-center max-w-sm mx-auto"
              >
                {showProgressBar && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <PaginationProgress
                      currentPage={petsData.current_page}
                      totalPages={petsData.total_pages}
                    />
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    type="button"
                    className="px-16 border border-primary text-primary hover:bg-primary/90 hover:text-white transition-all duration-300 ease-in-out w-full"
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center"
                      >
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Carregando...
                      </motion.div>
                    ) : (
                      'Ver mais pets'
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}

export default Pets
