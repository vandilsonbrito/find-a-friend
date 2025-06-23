import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import type { PetFromAPI } from '../../@types'
import { formatCityName } from '../../utils/formatCityName'
import { motion } from 'framer-motion'

const PetCard: React.FC<PetFromAPI> = ({
  id,
  name,
  type,
  city,
  state,
  photos,
}) => {
  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'dog':
        return '🐶'
      case 'cat':
        return '🐱'
      default:
        return '🐾'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.5,}}
      whileInView={{ opacity: 1, }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.1,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      className="bg-white rounded-2xl shadow-sm border overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            photos[0] ||
            'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
          }
          alt={`${name} - um ${type}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
          <span>
            {getTypeEmoji(type)}{' '}
            {type === 'dog' ? 'Cachorro' : type === 'cat' ? 'Gato' : 'Outro'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-foreground/70 text-sm mb-4">
          {formatCityName(city)}, {state}
        </p>

        <Button asChild className="w-full">
          <Link to={`/pets/${id}`}>Ver detalhes</Link>
        </Button>
      </div>
    </motion.div>
  )
}

export default PetCard
