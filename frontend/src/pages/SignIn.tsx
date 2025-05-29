import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import useAuthContext from '../hooks/useAuthContext'

const SignIn: React.FC = () => {
  const { loginOrg } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await loginOrg({ email, password }, setIsLoading)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      return
    } finally {
      setIsLoading(false)
      navigate('/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Entrar como Organização</h1>
            <p className="text-foreground/70 mt-2">
              Acesse o painel para gerenciar seus pets para adoção
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-brand-500 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground/70">
              Ainda não tem conta?{' '}
              <Link
                to="/signup"
                className="text-brand-500 hover:underline font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SignIn
