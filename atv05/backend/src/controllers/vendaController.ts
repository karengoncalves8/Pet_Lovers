import { Request, Response } from 'express';
import { Pet } from '../models/Pet';
import { Venda } from '../models/Venda';
import { VendaItens } from '../models/VendaItens';
import { VendaItensPets } from '../models/VendaItensPets';
import { Cliente } from '../models/Cliente';
import { Consumiveis } from '../models/Consumiveis';

export const controllerVenda = {
  // POST /venda - Criar uma nova Venda
  save: async (req: Request, res: Response) => {
    const { Venda_total, Cliente_id, produtosConsumidos, servicosConsumidos } = req.body;

    try {
      const venda = await Venda.create({
        Venda_total,
        Cliente_id
      });

      for(const produto of produtosConsumidos){
        const produtoVenda = await VendaItens.create({
          Venda_id: venda.Venda_id,
          Cons_id: produto['prod_id'],
          VenItens_quantidade: produto['quantidade'],
          VenItens_total: produto['valor']
        });

        for(const pet of produto['pets']){
          const petVenda = await VendaItensPets.create({
            VenItens_id: produtoVenda.VenItens_id,
            Pet_id: pet,
          });
        }
      }

      for(const servico of servicosConsumidos){
        const servicoVenda = await VendaItens.create({
          Venda_id: venda.Venda_id,
          Cons_id: servico['serv_id'],
          VenItens_quantidade: servico['quantidade'],
          VenItens_total: servico['valor']
        });

        for(const pet of servico['pets']){
          const petVenda = await VendaItensPets.create({
            VenItens_id: servicoVenda.VenItens_id,
            Pet_id: pet,
          });
        }
      }

      return res.status(201).json({ message: 'Venda criada com sucesso!', venda });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar venda', details: error.message });
    }
  },

  // GET / Exibir todas as vendas
  getAllVendas: async (req: Request, res: Response) => {
    try {
      const vendas = await Venda.findAll({
        include: [
          {
            model: VendaItens,
            include: [
              {
                model: Pet
              },
              {
                model: Consumiveis, 
              }
            ],
          },
          {
            model: Cliente, 
          },
        ],
      });

      return res.status(200).json(vendas);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar vendas', details: error.message });
    }
  },

  // GET / Exibir venda específica
  getVendaById: async (req: Request, res: Response) => {
    const {id} = req.params
    try {
      const venda = await Venda.findByPk(id, {
        include: [
          {
            model: VendaItens,
            include: [
              {
                model: Pet
              },
              {
                model: Consumiveis, 
              }
            ],
          },
          {
            model: Cliente, 
          },
        ],
      });      
      if (!venda) {
        return res.status(404).json({message: "Venda não encontrado!"})
      }
      return res.status(200).json(venda)

      
    } catch (error) {
      return res.status(400).json({error: "Erro ao buscar venda"})
    }
  },

  // DELETE / Remover uma venda
  deleteVenda: async(req: Request, resp: Response) => {
    const { id } =  req.params
      try {
        const deleted = await Venda.destroy({where: {Venda_id: id}})
        return resp.status(200).json(deleted)
      } catch (error) {
        resp.status(400).json({error: 'Erro ao deletar Venda'})
      }
  }
};