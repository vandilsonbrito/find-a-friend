import React from 'react';
import { Search, MapPin, Heart } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <MapPin className="h-10 w-10 text-brand-500" />,
      title: "Escolha sua cidade",
      description: "Comece informando a sua localização para encontrarmos pets próximos a você."
    },
    {
      icon: <Search className="h-10 w-10 text-brand-500" />,
      title: "Filtre por características",
      description: "Defina suas preferências para encontrar o pet perfeito para sua família."
    },
    {
      icon: <Heart className="h-10 w-10 text-brand-500" />,
      title: "Converse com a ORG",
      description: "Entre em contato via WhatsApp com a organização responsável pelo pet."
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Como funciona</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Encontrar seu novo amigo é simples e rápido. Siga estes passos para adotar um animal de estimação.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-white rounded-2xl w-24 h-24 flex items-center justify-center shadow-sm border mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-foreground/70">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-2xl shadow-sm border">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-pet-100 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                <span className="text-3xl">🏠</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quer ajudar como organização?</h3>
                <p className="text-foreground/70 mb-4">
                  Se você representa uma organização de proteção animal, cadastre-se para divulgar seus pets para adoção.
                </p>
                <p className="font-medium">
                  <a href="/signup" className="text-brand-500 hover:underline">Cadastre sua organização →</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;