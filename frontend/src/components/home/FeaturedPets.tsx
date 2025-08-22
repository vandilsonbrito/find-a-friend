import React from 'react'
import { Button } from '@/components/ui/button'
import PetCard from '../pets/PetsCard'
import { Link } from 'react-router-dom'
import { useGetAvailablePets } from '../../services/hooks/useGetAvailablePets'
import PetsCardSkeletonLoading from '../pets/PetsCardSkeletonLoading'

const FeaturedPets: React.FC = () => {
  const { data: petsData, isLoading, error } = useGetAvailablePets()

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Pets em destaque</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Conheça alguns dos nossos amigos que estão esperando por um lar
            amoroso.
          </p>
        </div>

        {error && <p data-testid="error-message" className="text-center">Erro ao carregar os pets</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {!petsData && isLoading && (
            <>
              <PetsCardSkeletonLoading />
              <PetsCardSkeletonLoading />
              <PetsCardSkeletonLoading />
              <PetsCardSkeletonLoading />
            </>
          )}
          {petsData && petsData.pets.length === 0 && (
            <p data-testid="no-pets-message" className="text-center">Nenhum pet encontrado</p>
          )}
          {petsData &&
            petsData.pets.length > 0 &&
            petsData.pets
              ?.slice(0, 4)
              ?.map((pet) => <PetCard key={pet.id} {...pet} />)}
        </div>

        <div className="mt-12 text-center max-w-sm mx-auto">
          <Button
            size="lg"
            asChild
            className="px-16 border border-primary text-primary hover:bg-primary/90 hover:text-white transition-colors duration-300 ease-in-out w-full"
            variant="outline"
          >
            <Link to="/pets">Ver todos os pets</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPets
