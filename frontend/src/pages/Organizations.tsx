import React from 'react'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Button } from '../components/ui/button'
import { MapPin, Phone, ExternalLink } from 'lucide-react'

const organizations = [
  {
    id: '1',
    name: 'Amigos dos Animais SP',
    description:
      'Dedicada ao resgate e cuidado de animais abandonados em São Paulo.',
    address: 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP',
    phone: '+55 (11) 99999-1234',
    whatsapp: '+5511999991234',
    city: 'São Paulo',
    state: 'SP',
    totalPets: 25,
  },
  {
    id: '2',
    name: 'Casa dos Bichos Rio',
    description:
      'ONG focada na adoção responsável e conscientização sobre cuidados com pets.',
    address: 'Av. Copacabana, 456 - Copacabana, Rio de Janeiro - RJ',
    phone: '+55 (21) 98888-5678',
    whatsapp: '+5521988885678',
    city: 'Rio de Janeiro',
    state: 'RJ',
    totalPets: 18,
  },
  {
    id: '3',
    name: 'Patas Solidárias BH',
    description:
      'Trabalhamos para dar uma nova chance aos animais de rua de Belo Horizonte.',
    address: 'Rua da Esperança, 789 - Savassi, Belo Horizonte - MG',
    phone: '+55 (31) 97777-9012',
    whatsapp: '+5531977779012',
    city: 'Belo Horizonte',
    state: 'MG',
    totalPets: 32,
  },
]

const Organizations: React.FC = () => {
  const handleWhatsAppContact = (whatsapp: string, orgName: string) => {
    const message = `Olá! Gostaria de saber mais sobre a ${orgName} e como posso ajudar com a adoção de pets.`
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
      message,
    )}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
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
              <h2 className="heading-2 mb-4">Nossas Organizações</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Cada organização tem sua própria missão e história, mas todas
                compartilham o mesmo objetivo: encontrar lares amorosos para
                nossos amigos de quatro patas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {organizations.map((org) => (
                <Card
                  key={org.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{org.name}</CardTitle>
                    <CardDescription>{org.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-brand-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/70">{org.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-brand-500" />
                      <span className="text-foreground/70">{org.phone}</span>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-3 text-center">
                      <p className="text-sm text-foreground/70 mb-1">
                        Pets disponíveis
                      </p>
                      <p className="text-2xl font-bold text-brand-500">
                        {org.totalPets}
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
                      <Button variant="outline" className="w-full" asChild>
                        <a href={`/pets?city=${encodeURIComponent(org.city)}`}>
                          Ver Pets da {org.city}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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
      </main>
      <Footer />
    </div>
  )
}

export default Organizations
