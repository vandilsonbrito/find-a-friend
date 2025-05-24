import React from 'react';
import Navbar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedPets from '../components/home/FeaturedPets';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeaturedPets />
      </main>
      <Footer />
    </div>
  );
};

export default Home;