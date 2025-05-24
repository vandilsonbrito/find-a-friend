import React from 'react';
import { Button } from '../ui/Button';
import PetCard, { type PetCardProps } from '../pets/PetsCard';
import { Link } from 'react-router-dom';

const FeaturedPets: React.FC = () => {

  const featuredPets: PetCardProps[] = [
    {
      id: '1',
      name: 'Rex',
      type: 'dog',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'São Paulo',
      state: 'SP',
    },
    {
      id: '2',
      name: 'Luna',
      type: 'cat',
      image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Rio de Janeiro',
      state: 'RJ',
    },
    {
      id: '3',
      name: 'Bob',
      type: 'dog',
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Curitiba',
      state: 'PR',
    },
    {
      id: '4',
      name: 'Mia',
      type: 'cat',
      image: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      city: 'Belo Horizonte',
      state: 'MG',
    },
  ];

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Pets em destaque</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Conheça alguns dos nossos amigos que estão esperando por um lar amoroso.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPets.map(pet => (
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
  );
};

export default FeaturedPets;