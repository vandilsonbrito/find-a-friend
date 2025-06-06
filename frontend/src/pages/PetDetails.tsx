import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import { Button } from '../components/ui/button'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Phone,
  Heart,
  Activity,
  Ruler,
  Clock,
  MapPin,
} from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { translateToPT } from '../utils/translateTypes'
import { formatCityName } from '../utils/formatCityName'
import { useGetPet } from '../services/hooks/useGetPet'
import { useGetOrg } from '../services/hooks/useGetOrg'
import PetDetailSkeleton from '../components/PetDetails/PetDetailsSkeleton'
import { motion } from 'framer-motion'

const PetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { data: petData, isLoading } = useGetPet(id as string)
  const { data: orgdata } = useGetOrg(petData?.pets_data?.pet?.org_id as string)

  const selectedPetData = petData?.pets_data?.pet
  const selectedPetOrgData = orgdata?.org

  const handleWhatsAppClick = () => {
    const message = `Olá! Vi o ${selectedPetData?.name} no FindAFriend e gostaria de saber mais sobre o processo de adoção.`
    const whatsappUrl = `https://wa.me/${
      selectedPetOrgData?.whatsapp
    }?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isZooming, setIsZooming] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex-1 bg-secondary py-8"
      >
        <div className="container-custom">
          <Link
            to="/pets"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-brand-500 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para lista de pets
          </Link>

          {isLoading && <PetDetailSkeleton />}

          {!isLoading && selectedPetData && selectedPetOrgData && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <motion.div className="lg:col-span-8 space-y-8">
                <div className="h-[34rem] bg-white rounded-2xl overflow-hidden border">
                  <div
                    className="h-96 relative overflow-hidden top-5 flex justify-center items-center cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                  >
                    <img
                      src={selectedPetData?.photos[currentImageIndex]}
                      alt={selectedPetData?.name}
                      className="h-full object-contain border-2 border-gray-300 rounded-sm transition-transform duration-200"
                      style={{
                        transform: isZooming ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  </div>

                  <div className="p-4 mt-8 flex gap-2 overflow-x-auto">
                    {selectedPetData?.photos.map((image, index) => (
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
                          alt={`${selectedPetData?.name} - foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border">
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedPetData?.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">
                      {selectedPetData?.type === 'dog' ? 'Cachorro' : 'Gato'}
                    </Badge>
                    <Badge variant="secondary">{selectedPetData?.breed}</Badge>
                    <Badge variant="secondary">
                      {selectedPetData?.age &&
                        translateToPT('age', selectedPetData?.age)}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">Sobre</h3>
                  <p className="text-foreground/70 mb-6">
                    {selectedPetData?.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                      <Ruler className="h-6 w-6 text-brand-500 mb-2" />
                      <span className="text-sm text-foreground/70">
                        Tamanho
                      </span>
                      <span className="font-medium">
                        {selectedPetData?.size &&
                          translateToPT('size', selectedPetData?.size)}
                      </span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                      <Activity className="h-6 w-6 text-brand-500 mb-2" />
                      <span className="text-sm text-foreground/70">
                        Energia
                      </span>
                      <span className="font-medium">
                        {selectedPetData?.energy_level &&
                          translateToPT(
                            'energy_level',
                            selectedPetData?.energy_level,
                          )}
                      </span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                      <Heart className="h-6 w-6 text-brand-500 mb-2" />
                      <span className="text-sm text-foreground/70">
                        Independência
                      </span>
                      <span className="font-medium">
                        {selectedPetData?.independence_level &&
                          translateToPT(
                            'independence_level',
                            selectedPetData?.independence_level,
                          )}
                      </span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                      <Clock className="h-6 w-6 text-brand-500 mb-2" />
                      <span className="text-sm text-foreground/70">Idade</span>
                      <span className="font-medium">
                        {selectedPetData?.age &&
                          translateToPT('age', selectedPetData?.age)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="lg:col-span-4">
                <div className="bg-white rounded-2xl p-6 border sticky top-24">
                  <h3 className="text-xl font-semibold mb-6">Contato</h3>

                  <div className="mb-6">
                    <p className="font-medium text-lg">
                      {selectedPetOrgData?.name}
                    </p>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {selectedPetOrgData?.city &&
                          formatCityName(selectedPetOrgData?.city)}
                        , {selectedPetOrgData?.state}
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
          )}
        </div>
      </motion.main>
      <Footer />
    </div>
  )
}

export default PetDetails
