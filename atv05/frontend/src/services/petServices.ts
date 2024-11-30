import { Api } from "../config/api"
import { ApiException } from "../config/apiConfig"
import { Cliente } from "./clienteServices"

export interface Pet {
    Pet_id: number
    Pet_nome: string
    Pet_tipo: string
    Pet_raca: string
    Pet_genero: string
    Cliente_id: number | undefined
    Cliente?: Cliente
    isNew?: boolean;
}


const getAllPets = async (): Promise<Pet[] | ApiException> => {
  try{
    const { data } = await Api().get('/pet')
    return data
  } catch(error: any){
    return new ApiException(error.message || 'Erro ao consultar a API.')
  }
}

const createPet = async (pet: any): Promise<Pet | ApiException> => {
  try {
    const { data } = await Api().post<any>('/pet', pet, {
      headers: { 'Content-Type': 'application/json' }
    })

    const pet_criado: Pet = data
    return pet_criado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const updatePet = async (id:number, pet: any): Promise<Pet | ApiException> => {
  try {
    const { data } = await Api().put<any>(`/pet/${id}`, pet, {
      headers: { 'Content-Type': 'application/json' }
    });

    const pet_atualizado: Pet = data
    return pet_atualizado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const getPetByID = async (id: number): Promise<Pet | ApiException> => {
  try {
    const { data } = await Api().get<any>(`/pet/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    const pet: Pet = data;
    return pet

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const deletePet = async (id: number): Promise<any | ApiException> => {
  try {
    const { data } = await Api().delete<any>(`/pet/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    return data

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}


export const petServices = {
  getAllPets,
  createPet,
  getPetByID,
  updatePet,
  deletePet
}