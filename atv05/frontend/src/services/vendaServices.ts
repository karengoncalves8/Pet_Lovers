import { Api } from "../config/api"
import { ApiException } from "../config/apiConfig"
import { Cliente } from "./clienteServices"
import { Consumivel } from "./consumivelServices"
import { Pet } from "./petServices"

export interface Venda {
    Venda_id: number
    Venda_total: string
    Venda_data: Date
    Cliente_id: number
    Cliente: Cliente
    produtosConsumidos: Array<{prod_id: number, quantidade: number, valor: number, pets: []}>
    servicosConsumidos: Array<{serv_id: number, quantidade: number, valor: number, pets: []}>
    Venda_itens: VendaItens[]
    isNew?: boolean;
}

export interface VendaItens{
    VenItens_id: number,
    VenItens_quantidade: string,
    Consumiveis: Consumivel
    Pets: Pet[]
}

const getAllVendas = async (): Promise<Venda[] | ApiException> => {
  try{
    const { data } = await Api().get('/venda')
    return data
  } catch(error: any){
    return new ApiException(error.message || 'Erro ao consultar a API.')
  }
}

const createVenda = async (venda: any): Promise<Venda | ApiException> => {
  try {
    const { data } = await Api().post<any>('/venda', venda, {
      headers: { 'Content-Type': 'application/json' }
    })

    const venda_criado: Venda = data
    return venda_criado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}


const getVendaByID = async (id: number): Promise<Venda | ApiException> => {
  try {
    const { data } = await Api().get<any>(`/venda/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    const venda: Venda = data;
    return venda

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const deleteVenda = async (id: number): Promise<any | ApiException> => {
  try {
    const { data } = await Api().delete<any>(`/venda/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    return data

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}


export const vendaServices = {
  getAllVendas,
  createVenda,
  getVendaByID,
  deleteVenda
}