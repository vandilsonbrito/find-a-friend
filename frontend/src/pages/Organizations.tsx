import React, { useEffect } from 'react'
import Navbar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { useGetAllOrgs } from '../services/hooks/useGetAllOrgs'
import type { AllOrgsFromAPI } from '../@types'
import { formatCityName } from '../utils/formatCityName'
import { maskCEP, maskWhatsApp } from '../utils/formValidation'
import { motion } from 'framer-motion'
import { LoadingCardEffect } from '@/components/organizations/loadingCardEffect'

const Organizations: React.FC = () => {
  const { data: orgsData, isLoading, isError } = useGetAllOrgs()
  const handleWhatsAppContact = (whatsapp: string, orgName: string) => {
    const message = `Olá! Gostaria de saber mais sobre a ${orgName} e como posso ajudar com a adoção de pets.`
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
      message,
    )}`
    window.open(whatsappUrl, '_blank')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        transition={{ duration: 0.8, ease: 'easeOut' }}
        initial={{ y: 30, scale: 1 }}
        animate={{ y: 0, scale: 1 }}
        className="flex-1"
      >
        <section className="bg-gradient-to-r from-brand-500 to-orange-400 text-white py-16">
          <div className="container-custom text-center">
            <h1 className="heading-1 mb-6">Organizações Parceiras</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Conheça as ONGs e organizações que trabalham incansavelmente para
              conectar pets a lares cheios de amor
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">
                Algumas das Nossas Organizações
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Cada organização tem sua própria missão e história, mas todas
                compartilham o mesmo objetivo: encontrar lares amorosos para
                nossos amigos de quatro patas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {orgsData?.orgsList?.slice(0, 3).map((org: AllOrgsFromAPI) => (
                <motion.div
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  initial={{ y: 30, scale: 1, opacity: 0.7 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  key={org.id}
                  className="hover:shadow-xl transition-shadow rounded-md border border-border"
                  data-testid="org-card"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{org.name}</CardTitle>
                    <CardDescription>{org.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-brand-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/70">
                        {org.address} - {formatCityName(org.city)}, {org.state}.
                        CEP: {maskCEP(org.cep)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-brand-500" />
                      <span className="text-foreground/70">
                        {maskWhatsApp(org.whatsapp)}
                      </span>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-3 text-center">
                      <p className="text-sm text-foreground/70 mb-1">
                        Pets disponíveis
                      </p>
                      <p className="text-2xl font-bold text-brand-500">
                        {org.pets_count}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() =>
                          handleWhatsAppContact(org.whatsapp, org.name)
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Entrar em Contato
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              ))}
              {isLoading && (
                <>
                  <LoadingCardEffect />
                  <LoadingCardEffect />
                  <LoadingCardEffect />
                </>
              )}
            </div>
            {isError && (
              <div className="w-full flex items-center justify-center">
                <p data-testid="error-message" className="text-xl">
                  Erro ao carregar Organizações.
                </p>
              </div>
            )}

            <div className="mt-16 text-center">
              <div className="bg-secondary/30 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="heading-3 mb-4">É uma organização?</h3>
                <p className="text-lg text-foreground/70 mb-6">
                  Junte-se à nossa rede de organizações parceiras e ajude mais
                  pets a encontrarem um lar amoroso.
                </p>
                <Button size="lg" asChild>
                  <a href="/signup">Cadastrar Organização</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  )
}

export default Organizations
