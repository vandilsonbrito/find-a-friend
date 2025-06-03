import React from 'react'
import { Button } from '../ui/button'
import PetCard from '../pets/PetsCard'
import { Link } from 'react-router-dom'
import { useGetAvailablePets } from '../../services/hooks/useGetAvailablePets'

const FeaturedPets: React.FC = () => {

  const { data: petsData } = useGetAvailablePets()

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {petsData && petsData.slice(0, 4).map((pet) => (
            <PetCard key={pet.id} {...pet} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/pets">Ver todos os pets</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPets
