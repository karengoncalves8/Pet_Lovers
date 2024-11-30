import { Api } from "../config/api"
import { ApiException } from "../config/apiConfig"
import { Pet } from "./petServices"

export interface Cliente {
    Cli_id: number
    Cli_nome: string
    Cli_nomeSocial: string
    Cli_email: string
    Cli_cpf: string
    Endereco: Endereco
    Telefones: Telefone[]
    Pets: Pet[]
    Rgs: Rg[]
    isNew?: boolean;
}

export interface Endereco{
    End_id: number,
    End_estado: string,
    End_cidade: string,
    End_bairro: string,
    End_rua: string
    End_numero: number,
    End_codPostal: string,
    End_infoAdicionais: string
}

export interface Telefone{
    Tel_id: number,
    Tel_numero: number,
    Tel_ddd: number
}

export interface Rg{
  Rg_id: number,
  Rg_valor: string
}

const getAllClientes = async (): Promise<Cliente[] | ApiException> => {
  try{
    const { data } = await Api().get('/cliente')
    return data
  } catch(error: any){
    return new ApiException(error.message || 'Erro ao consultar a API.')
  }
}

const createCliente = async (cliente: any): Promise<Cliente | ApiException> => {
  try {
    const { data } = await Api().post<any>('/cliente', cliente, {
      headers: { 'Content-Type': 'application/json' }
    })

    const cliente_criado: Cliente = data
    return cliente_criado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const updateCliente = async (id:number, cliente: any): Promise<Cliente | ApiException> => {
  try {
    const { data } = await Api().put<any>(`/cliente/${id}`, cliente, {
      headers: { 'Content-Type': 'application/json' }
    });

    const cliente_atualizado: Cliente = data
    return cliente_atualizado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const getClienteByID = async (id: number): Promise<Cliente | ApiException> => {
  try {
    const { data } = await Api().get<any>(`/cliente/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    const cliente: Cliente = data;
    return cliente

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const deleteCliente = async (id: number): Promise<any | ApiException> => {
  try {
    const { data } = await Api().delete<any>(`/cliente/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    return data

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}


export const clienteServices = {
  getAllClientes,
  createCliente,
  getClienteByID,
  updateCliente,
  deleteCliente
}