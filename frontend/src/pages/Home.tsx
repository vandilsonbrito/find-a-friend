import React from 'react'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import FeaturedPets from '../components/home/FeaturedPets'
import { motion } from 'framer-motion'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        transition={{ duration: 0.8, ease: 'easeOut' }}
        initial={{ y: 30, scale: 1, opacity: 0.7 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        className="flex-1"
      >
        <Hero />
        <HowItWorks />
        <FeaturedPets />
      </motion.main>
      <Footer />
    </div>
  )
}

export default Home
