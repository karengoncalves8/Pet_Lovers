import { Request, Response } from 'express';
import { Pet } from '../models/Pet';
import { Cliente } from '../models/Cliente';

export const controllerPet = {
  // POST /pet - Criar um novo pet
  createPet: async (req: Request, res: Response) => {
    const { Pet_nome, Pet_raca, Pet_tipo, Pet_genero, Cliente_id } = req.body;

    try {
      const pet = await Pet.create({
        Pet_nome,
        Pet_raca,
        Pet_tipo,
        Pet_genero,
        Cliente_id
      });

      return res.status(201).json({ message: 'Pet criado com sucesso!', pet });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar pet', details: error.message });
    }
  },

  // GET / Exibir todos os pets
  getAllPets: async (req: Request, res: Response) => {
    try {
      const pets = await Pet.findAll({include: {model: Cliente}});

      return res.status(200).json(pets);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar pets', details: error.message });
    }
  },

  // GET / Exibir pet específico
  getPetById: async (req: Request, res: Response) => {
    const {id} = req.params
    try {
      const pet = await Pet.findByPk(id, {include: {model: Cliente}})
      if (!pet) {
        return res.status(404).json({message: "Pet não encontrado!"})
      }
      return res.status(200).json(pet)
    } catch (error) {
      return res.status(400).json({error: "Erro ao buscar pet"})
    }
  },

  // PUT / Editar um pet
  updatePet: async (req: Request, res: Response) => {
    const { Pet_nome, Pet_raca, Pet_tipo, Pet_genero, Cliente_id } = req.body;

    const {id} = req.params

    try {
      const [updatedPet] = await Pet.update({
          Pet_nome,
          Pet_raca,
          Pet_tipo,
          Pet_genero,
          Cliente_id
        },
        {where: {Pet_id: id}}
      );

      if (updatedPet) {
        const petAtualizado = await Pet.findByPk(id);
        return res.status(200).json({
          message: 'Pet atualizado com sucesso!',
          pet: petAtualizado,
        });
      }

      return res.status(400).json({ message: 'Nenhuma alteração realizada no pet.' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro de requisição para atualizar pet', details: error.message});
    }
  },

  // DELETE / Remover um Pet
  deletePet: async(req: Request, resp: Response) => {
    const {id} =  req.params
      try {
        const deleted = await Pet.destroy({where: {Pet_id: id}})
        return resp.status(200).json(deleted)
      } catch (error) {
        resp.status(400).json({error: 'Erro ao deletar Pet'})
      }
  }
};