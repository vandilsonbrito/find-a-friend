import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { validateStep1 } from '../../utils/formValidation'

interface SignUpStep1Props {
  formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  nextStep: () => void
}

const SignUpStep1: React.FC<SignUpStep1Props> = ({
  formData,
  handleChange,
  nextStep,
}) => {
  const handleNext = () => {
    if (validateStep1(formData)) {
      nextStep()
    }
  }

  return (
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

      <Button type="button" className="w-full" onClick={handleNext}>
        Continuar
      </Button>
    </>
  )
}

export default SignUpStep1