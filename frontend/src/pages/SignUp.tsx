import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import axiosInstance from '../axios'
import { SuccessToast } from '../components/SuccessToast'
import { ErrorToast } from '../components/ErrorToast'
import { unmaskValue, validateStep1, validateStep2 } from '../utils/formValidation'
import FormStep1 from '../components/signup/SignUpStep1'
import FormStep2 from '../components/signup/SignUpStep2'

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1)
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
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (step === 1 && !validateStep1(formData)) {
      return
    }
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 2 && !validateStep2(formData)) {
      return
    }
    setIsLoading(true)

    try {
      const passwordMatch = formData.password === formData.confirmPassword
      if (!passwordMatch) {
        ErrorToast('As senhas não são iguais.')
        setIsLoading(false)
        return
      }
      const formattedFormData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        description: formData.about,
        whatsapp: unmaskValue(formData.whatsapp),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        cep: unmaskValue(formData.postalCode),
      }
      console.log('Formatted form data:', formattedFormData)
      const response = await axiosInstance.post('/orgs', formattedFormData)
      if (response.status === 201) {
        SuccessToast('Organização cadastrada com sucesso!')
        setFormData({
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
        })
        setTimeout(() => {
          window.location.href = '/signin'
        }, 1000)
      }
    } catch (error: any) {
      ErrorToast(
        error.response?.status === 409
          ? 'E-mail já está em uso.'
          : 'Erro ao cadastrar organização.'
      )
      console.error('Erro no cadastro', error)
    } finally {
      setIsLoading(false)
    }
  }

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

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1
                      ? 'bg-brand-500 text-white'
                      : 'bg-secondary text-foreground/50'
                  }`}
                >
                  1
                </div>
                <span className="text-xs mt-1">Conta</span>
              </div>

              <div
                className={`flex-1 h-1 mx-2 ${
                  step >= 2 ? 'bg-brand-500' : 'bg-secondary'
                }`}
              ></div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2
                      ? 'bg-brand-500 text-white'
                      : 'bg-secondary text-foreground/50'
                  }`}
                >
                  2
                </div>
                <span className="text-xs mt-1">Organização</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <FormStep1
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
              />
            )}

            {step === 2 && (
              <FormStep2
              formData={formData}
              handleChange={handleChange}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
            )}
          </form>

          {step === 1 && (
            <div className="mt-6 text-center">
              <p className="text-foreground/70">
                Já tem uma conta?{' '}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:underline font-medium"
                >
                  Faça login
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SignUp