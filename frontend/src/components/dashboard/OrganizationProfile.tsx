import React from 'react'
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
import { Edit2 } from 'lucide-react'

const OrganizationProfile: React.FC = () => {
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
            <Input value="Amigos dos Animais SP" readOnly />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input value="contato@amigosdosanimais.org" readOnly />
          </div>
          <div className="space-y-2">
            <Label>WhatsApp</Label>
            <Input value="(11) 99999-1234" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Cidade</Label>
            <Input value="São Paulo - SP" readOnly />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Endereço</Label>
          <Input value="Rua das Flores, 123 - Vila Madalena" readOnly />
        </div>
        <div className="space-y-2">
          <Label>Sobre a organização</Label>
          <Textarea
            value="Dedicada ao resgate e cuidado de animais abandonados em São Paulo."
            readOnly
            rows={3}
          />
        </div>
        <Button variant="outline">
          <Edit2 className="h-4 w-4 mr-2" />
          Editar Perfil
        </Button>
      </CardContent>
    </Card>
  )
}

export default OrganizationProfile
