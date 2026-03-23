import pb from '@/lib/pocketbase/client'
import { RecordModel } from 'pocketbase'

export async function getPromotores(): Promise<RecordModel[]> {
  return pb.collection('promotores').getFullList({
    expand: 'cod_loja,nome_gerente,marca_produto,fabricante_produto',
    sort: 'promotor_nome',
  })
}

export async function getPromotor(id: string): Promise<RecordModel> {
  return pb.collection('promotores').getOne(id, {
    expand: 'cod_loja,nome_gerente,marca_produto,fabricante_produto',
  })
}
