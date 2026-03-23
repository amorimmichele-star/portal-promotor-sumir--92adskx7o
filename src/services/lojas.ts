import pb from '@/lib/pocketbase/client'
import { RecordModel } from 'pocketbase'

export async function getLojas(): Promise<RecordModel[]> {
  return pb.collection('lojas').getFullList({ sort: 'loja_nome' })
}

export async function getLoja(id: string): Promise<RecordModel> {
  return pb.collection('lojas').getOne(id)
}
