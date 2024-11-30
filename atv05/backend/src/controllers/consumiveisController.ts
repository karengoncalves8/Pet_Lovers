import { Request, Response } from 'express';
import { Consumiveis } from '../models/Consumiveis';

export const controllerConsumiveis = {
  // POST /consumivel - Criar um novo Consumivel (Produto ou Serviço)
  save: async (req: Request, res: Response) => {
    const { Cons_nome, Cons_descricao, Cons_valor, Cons_tipo } = req.body;

    try {
      const consumivel = await Consumiveis.create({
        Cons_nome,
        Cons_descricao,
        Cons_valor, 
        Cons_tipo
      });

      return res.status(201).json({ message: 'Consumivel criado com sucesso!', consumivel });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar consumivel', details: error.message });
    }
  },

  // GET / Exibir todos os consumiveis
  getAllConsumiveis: async (req: Request, res: Response) => {
    try {
      const consumiveis = await Consumiveis.findAll();

      return res.status(200).json(consumiveis);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar consumiveis', details: error.message });
    }
  },

  // GET/tipo / Exibir todos os consumiveis de um tipo específico - Produto ou Serviço
  getConsumiveisByType: async (req: Request, res: Response) => {
    const { tipo } = req.params;
    try {
      const consumiveis = await Consumiveis.findAll({where: { Cons_tipo: tipo }});

      return res.status(200).json(consumiveis);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar consumiveis por tipo', details: error.message });
    }
  },

  // GET / Exibir cliente específico
  getConsumivelById: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const consumivel = await Consumiveis.findByPk(id)
      if (!consumivel) {
        return res.status(404).json({message: "Consumivel não encontrado!"})
      }
      return res.status(200).json(consumivel)

      
    } catch (error) {
      return res.status(400).json({error: "Erro ao buscar consumivel"})
    }
  },

  // PUT / Editar um consumivel
  updateConsumivel: async (req: Request, res: Response) => {
    const { Cons_nome, Cons_descricao, Cons_valor, Cons_tipo } = req.body;

    const {id} = req.params

    try {
      const [updatedConsumivel] = await Consumiveis.update({
          Cons_nome,
          Cons_descricao,
          Cons_valor
        },
        {where: {Cons_id: id}}
      );

      if (updatedConsumivel) {
        const consumivelAtualizado = await Consumiveis.findByPk(id);
        return res.status(200).json({
          message: `${Cons_tipo} atualizado com sucesso`,
          pet: consumivelAtualizado,
        });
      }

      return res.status(400).json({ message: 'Nenhuma alteração realizada no consumivel.' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro de requisição para atualizar consumivel', details: error.message});
    }
  },

  // DELETE / Remover um consumivel
  deleteConsumivel: async(req: Request, resp: Response) => {
    const { id } =  req.params
      try {
        const deleted = await Consumiveis.destroy({where: {Cons_id: id}})
        return resp.status(200).json(deleted)
      } catch (error) {
        resp.status(400).json({error: 'Erro ao deletar consumivel'})
      }
  }
};