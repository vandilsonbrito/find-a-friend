import { ErrorToast } from '../components/ErrorToast'

export const validateStep1 = (formData: {
  name: string
  email: string
  password: string
  confirmPassword: string
}) => {
  if (!formData.name.trim()) {
    ErrorToast('O nome da organização é obrigatório.')
    return false
  }
  if (!formData.email.trim()) {
    ErrorToast('O e-mail é obrigatório.')
    return false
  }
  if (!formData.password) {
    ErrorToast('A senha é obrigatória.')
    return false
  }
  if (!formData.confirmPassword) {
    ErrorToast('A confirmação da senha é obrigatória.')
    return false
  }
  if (formData.password !== formData.confirmPassword) {
    ErrorToast('As senhas não coincidem.')
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    ErrorToast('Por favor, insira um e-mail válido.')
    return false
  }
  return true
}

export const validateStep2 = (formData: {
  address: string
  city: string
  state: string
  postalCode: string
  whatsapp: string
}) => {
  if (!formData.address.trim()) {
    ErrorToast('O endereço é obrigatório.')
    return false
  }
  if (!formData.city.trim()) {
    ErrorToast('A cidade é obrigatória.')
    return false
  }
  if (!formData.state.trim()) {
    ErrorToast('O estado é obrigatório.')
    return false
  }
  if (!formData.postalCode.trim()) {
    ErrorToast('O CEP é obrigatório.')
    return false
  }
  if (!formData.whatsapp.trim()) {
    ErrorToast('O WhatsApp é obrigatório.')
    return false
  }
  const stateRegex = /^[A-Z]{2}$/
  if (!stateRegex.test(formData.state)) {
    ErrorToast('Por favor, insira um estado valido (formato: AA).')
    return false
  }
  const cepRegex = /^\d{5}-\d{3}$/
  if (!cepRegex.test(formData.postalCode)) {
    ErrorToast('Por favor, insira um CEP válido (formato: 00000-000).')
    return false
  }
  const whatsappRegex = /^\(\d{2}\)\s*\d{5}-\d{4}$/
  if (!whatsappRegex.test(formData.whatsapp)) {
    ErrorToast('Por favor, insira um WhatsApp válido (formato: (00) 00000-0000).')
    return false
  }
  return true
}

export const maskCEP = (value: string): string => {
    // Remove whitespaces
    const digits = value.replace(/\D/g, '')
    // mask CEP: 00000-000
    if (digits.length <= 5) {
      return digits
    }
    return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`
  }
  
  export const maskWhatsApp = (value: string): string => {
    // Remove whitespaces
    const digits = value.replace(/\D/g, '')
    // mask WhatsApp: (00) 00000-0000
    if (digits.length <= 2) {
      return `(${digits}`
    }
    if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  export const unmaskValue = (value: string): string => {
    return value.replace(/\D/g, '')
  }