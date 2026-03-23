import pb from '@/lib/pocketbase/client'
import { RecordModel } from 'pocketbase'

export async function getActiveVisit(promoterId: string): Promise<RecordModel | null> {
  try {
    const record = await pb
      .collection('visitas')
      .getFirstListItem(`promotor = "${promoterId}" && check_out = ""`, {
        sort: '-created',
      })
    return record
  } catch (e) {
    return null
  }
}

export async function createVisit(data: {
  promotor: string
  loja: string
  check_in: string
}): Promise<RecordModel> {
  return pb.collection('visitas').create(data)
}

export async function updateVisit(
  id: string,
  data: { check_out: string; observacoes?: string },
): Promise<RecordModel> {
  return pb.collection('visitas').update(id, data)
}
