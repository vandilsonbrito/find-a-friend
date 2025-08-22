import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { validateStep2, maskCEP, maskWhatsApp } from '../../utils/formValidation'

interface SignUpStep2Props {
  formData: {
    address: string
    city: string
    state: string
    postalCode: string
    whatsapp: string
    about: string
  }
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  prevStep: () => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

const SignUpStep2: React.FC<SignUpStep2Props> = ({
  formData,
  handleChange,
  prevStep,
  handleSubmit,
  isLoading,
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep2(formData)) {
      handleSubmit(e)
    }
  }

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskCEP(e.target.value)
    handleChange({
      ...e,
      target: { ...e.target, name: 'postalCode', value: maskedValue },
    })
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskWhatsApp(e.target.value)
    handleChange({
      ...e,
      target: { ...e.target, name: 'whatsapp', value: maskedValue },
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            data-testid="address-input"
            name="address"
            placeholder="Rua, número, complemento"
            value={formData.address}
            onChange={handleChange}
            type='text'
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            data-testid="city-input"
            name="city"
            placeholder="Sua cidade"
            value={formData.city}
            onChange={handleChange}
            type='text'
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            data-testid="state-input"
            name="state"
            placeholder="SP"
            value={formData.state}
            onChange={handleChange}
            minLength={2}
            maxLength={2}
            type='text'
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">CEP</Label>
          <Input
            id="postalCode"
            data-testid="postal-code-input"
            name="postalCode"
            placeholder="00000-000"
            value={formData.postalCode}
            onChange={handleCEPChange}
            required
            maxLength={9}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          data-testid="whatsapp-input"
          name="whatsapp"
          placeholder="(00) 00000-0000"
          value={formData.whatsapp}
          onChange={handleWhatsAppChange}
          required
          maxLength={15}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="about">Sobre a organização</Label>
        <Textarea
          id="about"
          data-testid="about-input"
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

        <Button type="submit" className="flex-1" disabled={isLoading} onClick={handleFormSubmit}>
          {isLoading ? 'Cadastrando...' : 'Finalizar cadastro'}
        </Button>
      </div>
    </div>
  )
}

export default SignUpStep2