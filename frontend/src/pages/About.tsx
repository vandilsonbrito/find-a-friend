import React, { useEffect } from 'react'
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
import { Heart, Users, Shield, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const values = [
  {
    icon: Heart,
    title: 'Amor e Compaixão',
    description:
      'Acreditamos que todo animal merece amor, cuidado e um lar seguro onde possa ser feliz.',
  },
  {
    icon: Users,
    title: 'Comunidade',
    description:
      'Trabalhamos junto com ONGs, voluntários e adotantes para criar uma rede de apoio forte.',
  },
  {
    icon: Shield,
    title: 'Adoção Responsável',
    description:
      'Promovemos a adoção consciente, garantindo que pets e famílias sejam compatíveis.',
  },
  {
    icon: Sparkles,
    title: 'Transparência',
    description:
      'Mantemos processos claros e transparentes para conectar pets a lares amorosos.',
  },
]
const team = [
  {
    name: 'Vandilson Brito',
    role: 'Desenvolvedor Fullstack',
    description:
      'Garante que a plataforma seja fácil de usar para adotantes e organizações.',
  },
]

const About: React.FC = () => {
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
            <h1 className="heading-1 mb-6">Sobre a FindAFriend</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Nossa missão é conectar pets abandonados a lares cheios de amor,
              criando uma ponte entre organizações de resgate e famílias que
              desejam adotar
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 mb-6">Nossa História</h2>
                <div className="space-y-4 text-lg text-foreground/80">
                  <p>
                    A FindAFriend nasceu da necessidade de criar uma plataforma
                    que facilitasse o processo de adoção de animais no Brasil.
                    Vimos que muitas ONGs e organizações tinham dificuldades
                    para dar visibilidade aos seus pets disponíveis para adoção.
                  </p>
                  <p>
                    Em 2024, decidimos criar uma solução tecnológica que
                    conectasse essas organizações diretamente com pessoas
                    interessadas em adotar, tornando o processo mais eficiente e
                    transparente.
                  </p>
                  <p>
                    Hoje, já ajudamos centenas de pets a encontrarem um novo lar
                    e continuamos crescendo nossa rede de organizações
                    parceiras.
                  </p>
                </div>
              </div>
              <motion.div
                transition={{ duration: 1.5, ease: 'easeOut' }}
                initial={{ y: 30, scale: 1, opacity: 0.7 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                className="bg-secondary/30 rounded-2xl p-8"
              >
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-brand-500 mb-2">
                      500+
                    </p>
                    <p className="text-foreground/70">Pets Adotados</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-brand-500 mb-2">
                      50+
                    </p>
                    <p className="text-foreground/70">Organizações</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-brand-500 mb-2">15</p>
                    <p className="text-foreground/70">Estados</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-brand-500 mb-2">
                      1000+
                    </p>
                    <p className="text-foreground/70">Famílias Felizes</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/20">
          <motion.div
            initial={{ opacity: 0.8, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            className="container-custom"
          >
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Nossos Valores</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Estes são os princípios que guiam nosso trabalho e nossa missão
                de conectar pets a lares amorosos.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0.8, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-brand-500/10 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-brand-500" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section className="py-16">
          <motion.div
            initial={{ opacity: 0.8, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              delay: 0.1,
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
            className="container-custom"
          >
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Nossa Equipe</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Conheça as pessoas apaixonadas que trabalham todos os dias para
                tornar a adoção de pets mais fácil e eficiente.
              </p>
            </div>

            <div className="flex justify-center items-center">
              {team.map((member, index) => (
                <Card key={index} className="w-[450px] h-[270px] text-center">
                  <CardHeader>
                    <div className="mx-auto w-20 h-20 bg-brand-500/10 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-10 w-10 text-brand-500" />
                    </div>
                    <CardTitle className="hover:underline">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://linkedin.com/in/vandilson-brito-desenvolvedor-fullstack"
                      >
                        {member.name}
                      </a>
                    </CardTitle>
                    <CardDescription className="text-brand-500 font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="py-16 bg-brand-500 text-white">
          <div className="container-custom text-center">
            <h2 className="heading-2 mb-6">Faça Parte da Nossa Missão</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Seja adotando um pet, se voluntariando ou apoiando nosso trabalho,
              você pode fazer a diferença na vida de um animal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="/pets">Adotar um Pet</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-black border-white hover:bg-white hover:text-brand-500"
                asChild
              >
                <a href="/signup">Cadastrar Organização</a>
              </Button>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  )
}

export default About
