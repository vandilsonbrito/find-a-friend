import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export interface PetCardProps {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  image: string;
  city: string;
  state: string;
}

const PetCard: React.FC<PetCardProps> = ({ id, name, type, image, city, state }) => {
  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'dog':
        return '🐶';
      case 'cat':
        return '🐱';
      default:
        return '🐾';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={`${name} - um ${type}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
          <span>{getTypeEmoji(type)} {type === 'dog' ? 'Cachorro' : type === 'cat' ? 'Gato' : 'Outro'}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-foreground/70 text-sm mb-4">{city}, {state}</p>
        
        <Button asChild className="w-full">
          <Link to={`/pets/${id}`}>Ver mais</Link>
        </Button>
      </div>
    </div>
  );
};

export default PetCard;