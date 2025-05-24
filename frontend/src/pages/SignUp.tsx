import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import { Textarea } from '../components/ui/textarea';

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    whatsapp: '',
    about: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Cadastro com', formData);
      // Aqui você faria uma chamada para sua API de cadastro
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirecionar ou mostrar mensagem de sucesso
    } catch (error) {
      console.error('Erro no cadastro', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Cadastro de Organização</h1>
            <p className="text-foreground/70 mt-2">
              {step === 1 
                ? 'Crie sua conta para começar a cadastrar pets para adoção' 
                : 'Preencha as informações de contato da sua organização'}
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-brand-500 text-white' : 'bg-secondary text-foreground/50'
                }`}>
                  1
                </div>
                <span className="text-xs mt-1">Conta</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${
                step >= 2 ? 'bg-brand-500' : 'bg-secondary'
              }`}></div>
              
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-brand-500 text-white' : 'bg-secondary text-foreground/50'
                }`}>
                  2
                </div>
                <span className="text-xs mt-1">Organização</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Organização</Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="ONG Amigos dos Animais"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="contato@suaong.org"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirme a senha</Label>
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  type="button" 
                  className="w-full" 
                  onClick={nextStep}
                >
                  Continuar
                </Button>
              </>
            )}
            
            {step === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input 
                      id="address"
                      name="address"
                      placeholder="Rua, número, complemento"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input 
                      id="city"
                      name="city"
                      placeholder="Sua cidade"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input 
                      id="state"
                      name="state"
                      placeholder="Estado"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">CEP</Label>
                    <Input 
                      id="postalCode"
                      name="postalCode"
                      placeholder="00000-000"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input 
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="(00) 00000-0000"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="about">Sobre a organização</Label>
                  <Textarea 
                    id="about"
                    name="about"
                    placeholder="Conte um pouco sobre o trabalho da sua organização..."
                    value={formData.about}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="flex-1" 
                    onClick={prevStep}
                  >
                    Voltar
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Cadastrando...' : 'Finalizar cadastro'}
                  </Button>
                </div>
              </>
            )}
          </form>
          
          {step === 1 && (
            <div className="mt-6 text-center">
              <p className="text-foreground/70">
                Já tem uma conta?{' '}
                <Link to="/signin" className="text-brand-500 hover:underline font-medium">
                  Faça login
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;