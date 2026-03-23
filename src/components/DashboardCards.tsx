import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, MapPin, Percent, Users } from 'lucide-react'
import { DashboardStats } from '@/services/dashboard'

export function DashboardCards({ stats }: { stats?: DashboardStats }) {
  const data = stats || { totalLojas: 0, promotoresAtivos: 0, cobertura: 0, visitasHoje: 0 }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Lojas</CardTitle>
          <Store className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalLojas}</div>
          <p className="text-xs text-muted-foreground">Unidades cadastradas</p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up delay-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Check-ins Hoje</CardTitle>
          <MapPin className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.visitasHoje}</div>
          <p className="text-xs text-muted-foreground">Visitas registradas hoje</p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up delay-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cobertura (Lojas c/ Promotor)</CardTitle>
          <Percent className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.cobertura}%</div>
          <p className="text-xs text-muted-foreground">Da rede coberta</p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up delay-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promotores Ativos</CardTitle>
          <Users className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.promotoresAtivos}</div>
          <p className="text-xs text-muted-foreground">Em operação</p>
        </CardContent>
      </Card>
    </div>
  )
}
