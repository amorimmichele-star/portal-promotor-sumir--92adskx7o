import pb from '@/lib/pocketbase/client'
import { RecordModel } from 'pocketbase'

export interface DashboardStats {
  totalLojas: number
  promotoresAtivos: number
  cobertura: number
  visitasHoje: number
}

export async function getDashboardData(): Promise<{
  stats: DashboardStats
  recentVisits: RecordModel[]
}> {
  try {
    const lojasList = await pb.collection('lojas').getList(1, 1, { requestKey: null })
    const promotoresList = await pb.collection('promotores').getList(1, 1, { requestKey: null })

    // Cobertura calculation
    const allPromotores = await pb.collection('promotores').getFullList({ requestKey: null })
    const uniqueLojas = new Set(allPromotores.map((p) => p.cod_loja).filter(Boolean))
    const cobertura =
      lojasList.totalItems > 0 ? Math.round((uniqueLojas.size / lojasList.totalItems) * 100) : 0

    // Visitas Hoje
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().replace('T', ' ')

    const visitasHojeList = await pb.collection('visitas').getList(1, 1, {
      filter: `created >= "${todayStr}"`,
      requestKey: null,
    })

    // Recent visits
    const recentVisits = await pb.collection('visitas').getList(1, 5, {
      sort: '-created',
      expand: 'promotor,loja',
      requestKey: null,
    })

    return {
      stats: {
        totalLojas: lojasList.totalItems,
        promotoresAtivos: promotoresList.totalItems,
        cobertura,
        visitasHoje: visitasHojeList.totalItems,
      },
      recentVisits: recentVisits.items,
    }
  } catch (error) {
    console.error('Failed to load dashboard data', error)
    return {
      stats: { totalLojas: 0, promotoresAtivos: 0, cobertura: 0, visitasHoje: 0 },
      recentVisits: [],
    }
  }
}
