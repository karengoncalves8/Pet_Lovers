import { Api } from "../config/api"
import { ApiException } from "../config/apiConfig"

export interface ConsumoPorTipoPet {
    pet_tipo: string
    consumiveis: Array<{consumivel: string, quantidade: number}>
}

export interface ConsumoPorRacaPet{
    pet_raca: string
    consumiveis: Array<{consumivel: string, quantidade: number}>
}

export interface ConsumoClienteValor {
    Cliente: string
    Consumo: number
}

export interface ConsumoClienteQuantidade {
    Cliente: string
    Quantidade: number
}

export interface ConsumoConsumivel {
    consumivel: string
    quantidade: number
}

const getConsumoPorTipoPet = async (): Promise<ConsumoPorTipoPet[] | ApiException> => {
  try{
    const { data } = await Api().get('/estatisticas/consumiveisConsumoTipoPet')
    return data
  } catch(error: any){
    return new ApiException(error.message || 'Erro ao consultar a API.')
  }
}

const getConsumoPorRacaPet = async (): Promise<ConsumoPorRacaPet[] | ApiException> => {
    try{
      const { data } = await Api().get('/estatisticas/consumiveisConsumoRacaPet')
      return data
    } catch(error: any){
      return new ApiException(error.message || 'Erro ao consultar a API.')
    }
  }

const getClienteConsumoValor = async (): Promise<ConsumoClienteValor[] | ApiException> => {
    try{
      const { data } = await Api().get('/estatisticas/clienteConsumoValor')
      return data
    } catch(error: any){
      return new ApiException(error.message || 'Erro ao consultar a API.')
    }
}

const getClienteConsumoQuantidade = async (): Promise<ConsumoClienteQuantidade[] | ApiException> => {
    try{
      const { data } = await Api().get('/estatisticas/clienteConsumoQuantidade')
      return data
    } catch(error: any){
      return new ApiException(error.message || 'Erro ao consultar a API.')
    }
}

const getConsumivelConsumo = async (): Promise<ConsumoConsumivel[] | ApiException> => {
    try{
      const { data } = await Api().get('/estatisticas/consumiveisConsumo')
      return data
    } catch(error: any){
      return new ApiException(error.message || 'Erro ao consultar a API.')
    }
}

export const estatisticasServices = {
    getConsumoPorTipoPet,
    getClienteConsumoQuantidade,
    getClienteConsumoValor,
    getConsumivelConsumo,
    getConsumoPorRacaPet
}