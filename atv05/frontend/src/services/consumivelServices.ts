import { Api } from "../config/api"
import { ApiException } from "../config/apiConfig"

export interface Consumivel {
    Cons_id: number
    Cons_nome: string
    Cons_descricao: string
    Cons_valor: number
    Cons_tipo:'Produto' | 'Servico'
    isNew?: boolean;
}

const getAllConsumiveis = async (): Promise<Consumivel[] | ApiException> => {
  try{
    const { data } = await Api().get('/consumiveis')
    return data
  } catch(error: any){
    return new ApiException(error.message || 'Erro ao consultar a API.')
  }
}

const getConsumiveisByType = async (tipo: 'Produto' | 'Servico'): Promise<Consumivel[] | ApiException> => {
    try {
      const { data } = await Api().get(`/consumiveis/tipo/${tipo}` ,{
        headers: { 'Content-Type': 'application/json' }
      })
      return data

    } catch (error: any) {
      return new ApiException(error.message || 'Erro ao criar o registro.')
    }
  }

const createConsumivel = async (consumivel: any): Promise<Consumivel | ApiException> => {
  try {
    const { data } = await Api().post<any>('/consumiveis', consumivel, {
      headers: { 'Content-Type': 'application/json' }
    })

    const consumivel_criado: Consumivel = data
    return consumivel_criado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const updateConsumivel = async (id:number, consumivel: any): Promise<Consumivel | ApiException> => {
  try {
    const { data } = await Api().put<any>(`/consumiveis/${id}`, consumivel, {
      headers: { 'Content-Type': 'application/json' }
    });

    const consumivel_atualizado: Consumivel = data
    return consumivel_atualizado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const getConsumivelByID = async (id: number): Promise<Consumivel | ApiException> => {
  try {
    const { data } = await Api().get<any>(`/consumiveis/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    const consumivel: Consumivel = data;
    return consumivel

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const deleteConsumivel = async (id: number): Promise<any | ApiException> => {
  try {
    const { data } = await Api().delete<any>(`/consumiveis/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    return data

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}


export const consumivelServices = {
  getAllConsumiveis,
  getConsumiveisByType,
  getConsumivelByID,
  createConsumivel,
  updateConsumivel,
  deleteConsumivel
}