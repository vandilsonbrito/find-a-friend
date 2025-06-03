import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Edit2, Save, X } from 'lucide-react'
import { maskCEP, maskWhatsApp, unmaskValue } from '../../utils/formValidation'
import useAuthContext from '../../hooks/useAuthContext'
import type { OrgFromAPI } from '../../@types'
import axiosInstance from '../../axios'
import { SuccessToast } from '../SuccessToast'
import { ErrorToast } from '../ErrorToast'


const OrganizationProfile: React.FC = () => {

  const { user: orgData, setUser } = useAuthContext()
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(orgData)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }) as OrgFromAPI | null)
  }

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskCEP(e.target.value)
    handleInputChange('cep', maskedValue)
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskWhatsApp(e.target.value)
    handleInputChange('whatsapp', maskedValue)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setFormData(orgData)
    setIsEditing(false)
  }

  const handleSave = () => {
    const formattedData = {
      ...formData,
      whatsapp: unmaskValue(formData?.whatsapp as string),
      cep: unmaskValue(formData?.cep as string),
    }
    axiosInstance
      .put(`http://localhost:3333/orgs/${orgData?.id}/profile`, formattedData)
      .then(async response => {
        if(response.status === 200) {
          SuccessToast('Dados salvos com sucesso!')
          const updatedOrg = response.data 
          setUser(updatedOrg.org.org as OrgFromAPI)
          setIsEditing(false)
        } else {
          ErrorToast('Erro ao salvar dados.')
          console.error('Erro status não 200:', response)
        }
      })
      .catch(error => {
        ErrorToast('Erro ao salvar dados.')
        console.error('Erro ao salvar dados:', error)
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Organização</CardTitle>
        <CardDescription>Gerencie as informações do seu perfil</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nome da Organização</Label>
            <Input 
              value={formData?.name} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input 
              value={formData?.email} 
              readOnly 
            />
          </div>
          <div className="space-y-2">
            <Label>WhatsApp</Label>
            <Input 
              value={maskWhatsApp(formData?.whatsapp as string)} 
              readOnly={!isEditing}
              onChange={handleWhatsAppChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Cidade</Label>
            <Input 
              value={formData?.city} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Estado</Label>
            <Input 
              value={formData?.state} 
              readOnly={!isEditing}
              onChange={(e) => handleInputChange('state', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>CEP</Label>
            <Input 
              value={maskCEP(formData?.cep as string)} 
              readOnly={!isEditing}
              onChange={handleCEPChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Endereço</Label>
          <Input 
            value={formData?.address} 
            readOnly={!isEditing}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Sobre a organização</Label>
          <Textarea
            value={formData?.description}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
          />
        </div>
        
        <div className="flex gap-2">
          {!isEditing ? (
            <Button variant="outline" onClick={handleEdit}>
              <Edit2 className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          ) : (
            <>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default OrganizationProfile