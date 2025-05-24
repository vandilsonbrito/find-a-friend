import React from 'react'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Phone,
  MapPin,
  Heart,
  Activity,
  Ruler,
  Clock,
} from 'lucide-react'
import { Badge } from '../components/ui/badge'

const PetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const pet = {
    id: id || '1',
    name: 'Rex',
    type: 'dog',
    breed: 'Labrador',
    age: '2 anos',
    size: 'Grande',
    energy: 'Alto',
    independence: 'Médio',
    images: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    ],
    description:
      'Rex é um labrador muito animado e brincalhão. Ele adora correr, brincar com bolinhas e está sempre pronto para uma aventura. É muito carinhoso com humanos e se dá bem com outros cães. Ideal para famílias ativas que possam dar a ele bastante exercício e atenção.',
    requirements: [
      'Espaço para correr e brincar',
      'Passeios regulares',
      'Interação com pessoas',
      'Alimentação balanceada',
    ],
    org: {
      id: '123',
      name: 'ONG Amigos dos Animais',
      whatsapp: '+5511999999999',
      city: 'São Paulo',
      state: 'SP',
    },
  }

  const handleWhatsAppClick = () => {
    const message = `Olá! Vi o ${pet.name} no FindAFriend e gostaria de saber mais sobre o processo de adoção.`
    const whatsappUrl = `https://wa.me/${
      pet.org.whatsapp
    }?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary py-8">
        <div className="container-custom">
          <Link
            to="/pets"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-brand-500 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para lista de pets
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-2xl overflow-hidden border">
                <div className="h-96 relative">
                  <img
                    src={pet.images[currentImageIndex]}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex gap-2 overflow-x-auto">
                  {pet.images.map((image, index) => (
                    <button
                      key={index}
                      className={`w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                        index === currentImageIndex
                          ? 'border-brand-500'
                          : 'border-transparent'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${pet.name} - foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border">
                <h2 className="text-3xl font-bold mb-2">{pet.name}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">
                    {pet.type === 'dog' ? 'Cachorro' : 'Gato'}
                  </Badge>
                  <Badge variant="secondary">{pet.breed}</Badge>
                  <Badge variant="secondary">{pet.age}</Badge>
                </div>

                <h3 className="text-xl font-semibold mb-3">Sobre</h3>
                <p className="text-foreground/70 mb-6">{pet.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                    <Ruler className="h-6 w-6 text-brand-500 mb-2" />
                    <span className="text-sm text-foreground/70">Tamanho</span>
                    <span className="font-medium">{pet.size}</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                    <Activity className="h-6 w-6 text-brand-500 mb-2" />
                    <span className="text-sm text-foreground/70">Energia</span>
                    <span className="font-medium">{pet.energy}</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                    <Heart className="h-6 w-6 text-brand-500 mb-2" />
                    <span className="text-sm text-foreground/70">
                      Independência
                    </span>
                    <span className="font-medium">{pet.independence}</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                    <Clock className="h-6 w-6 text-brand-500 mb-2" />
                    <span className="text-sm text-foreground/70">Idade</span>
                    <span className="font-medium">{pet.age}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  Requisitos para adoção
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                  {pet.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-6 border sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Contato</h3>

                <div className="mb-6">
                  <p className="font-medium text-lg">{pet.org.name}</p>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {pet.org.city}, {pet.org.state}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2 mb-4"
                  onClick={handleWhatsAppClick}
                >
                  <Phone className="h-5 w-5" />
                  Entrar em contato
                </Button>

                <p className="text-sm text-foreground/70 text-center">
                  Entre em contato via WhatsApp com a ORG responsável
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PetDetails
