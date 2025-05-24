import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container-custom flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-10 md:mb-0">
          <h1 className="heading-1 text-center md:text-left mb-6">
            <span className="text-brand-500">Encontre</span> o amigo perfeito{' '}
            <br className="hidden md:inline" />
            para sua família
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 text-center md:text-left mb-8 max-w-xl">
            Conectamos animais que precisam de um lar com pessoas que têm amor
            para oferecer. Adote, não compre!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" asChild className="gap-2">
              <Link to="/pets">
                <Search className="h-5 w-5" />
                Buscar Pets
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/signup">Sou uma ORG</Link>
            </Button>
          </div>

          <div className="mt-10 flex justify-center md:justify-start gap-8">
            <div>
              <p className="text-3xl font-bold text-brand-500">+2.500</p>
              <p className="text-sm text-foreground/70">Pets adotados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-500">+150</p>
              <p className="text-sm text-foreground/70">ORGs parceiras</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-500">+30</p>
              <p className="text-sm text-foreground/70">Cidades</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
            <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-pet-200 rounded-full top-0 right-0 md:right-12 lg:top-14 animate-bounce-slow"></div>

            <div className="absolute z-10 w-72 h-72 md:w-96 md:h-96 overflow-hidden rounded-full right-12 bottom-0">
              <img
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80"
                alt="Cachorro feliz"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-4 left-0 lg:left-28 bg-white rounded-2xl shadow-lg p-4 z-20 flex items-center gap-3 border">
              <div className="bg-pet-100 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-brand-600 text-xl">🐾</span>
              </div>
              <div>
                <p className="font-bold">+500 pets</p>
                <p className="text-sm text-foreground/70">esperando por você</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-20 -left-20 w-60 h-60 bg-pet-100 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-pet-100 rounded-full opacity-50"></div>
    </section>
  )
}

export default Hero
