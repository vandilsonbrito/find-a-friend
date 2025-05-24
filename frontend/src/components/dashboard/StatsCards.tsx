import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface StatsCardsProps {
  totalPets: number
  availablePets: number
  adoptedPets: number
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalPets,
  availablePets,
  adoptedPets,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground/70">
            Total de Pets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPets}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground/70">
            Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {availablePets}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground/70">
            Adotados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{adoptedPets}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsCards
