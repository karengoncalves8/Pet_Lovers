import { Request, Response } from 'express';
import { Cliente } from '../models/Cliente';
import { CliEndereco } from '../models/Endereco';
import { Rg } from '../models/RG';
import { Pet } from '../models/Pet';
import { Telefone } from '../models/Telefone';

export const controllerCliente = {
  // POST /cliente - Criar um novo cliente
  createCliente: async (req: Request, res: Response) =>{
    const { Cli_nome, Cli_nomeSocial, Cli_email, Cli_cpf, Endereco, Rgs, Telefones} = req.body;

    try {
      const cliente = await Cliente.create({
        Cli_nome,
        Cli_nomeSocial,
        Cli_email,
        Cli_cpf
      });

      const endereco = await CliEndereco.create({
          End_bairro: Endereco['End_bairro'],
          End_cidade: Endereco['End_cidade'],
          End_codPostal: Endereco['End_codPostal'],
          End_estado: Endereco['End_estado'],
          End_numero: Endereco['End_numero'],
          End_rua: Endereco['End_rua'],
          End_infoAdicionais: Endereco['End_infoAdicionais'],
          Cliente_id: cliente.Cli_id
      });

      for (const rg of Rgs){
        await Rg.create({
            Rg_valor: rg,
            Cliente_id: cliente.Cli_id
          });
      };

      for (const telefone of Telefones){
        await Telefone.create({
            Tel_ddd: telefone['Tel_ddd'],
            Tel_numero: telefone['Tel_numero'],
            Cliente_id: cliente.Cli_id
          });
      };

      return res.status(201).json({ message: 'Cliente criado com sucesso!', cliente });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar cliente', details: error.message });
    }
  },

  // GET / Exibir todos os clientes
  getAllClientes: async (req: Request, res: Response) => {
    try {
      const clientes = await Cliente.findAll({
        include: [Pet, CliEndereco, Rg, Telefone]
      });

      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar clientes', details: error.message });
    }
  },

  // GET / Exibir cliente específico
  getClienteById: async (req: Request, res: Response) => {
    const {id} = req.params
    try {
      const cliente = await Cliente.findByPk(id, {include: [Pet, CliEndereco, Rg, Telefone]})
      if (!cliente) {
        return res.status(404).json({message: "Cliente não encontrado!"})
      }
      return res.status(200).json(cliente)

      
    } catch (error) {
      return res.status(400).json({error: "Erro ao buscar cliente"})
    }
  },

  // PUT / Editar um cliente
  updateCliente: async (req: Request, res: Response) => {
    const { Cli_nome, Cli_nomeSocial, Cli_email, Cli_cpf, Endereco, Rgs, Telefones } = req.body;

    const {id} = req.params

    try {
      const [updatedCliente] = await Cliente.update({
          Cli_nome,
          Cli_nomeSocial,
          Cli_email,
          Cli_cpf
        },
        {where: {Cli_id: id}}
      );

      const [updatedEndereco] = await CliEndereco.update({
          End_bairro: Endereco['End_bairro'],
          End_cidade: Endereco['End_cidade'],
          End_codPostal: Endereco['End_codPostal'],
          End_estado: Endereco['End_estado'],
          End_numero: Endereco['End_numero'],
          End_rua: Endereco['End_rua'],
          End_infoAdicionais: Endereco['End_infoAdicionais']
        },
        {where: {Cliente_id: id}}
      );

      await Rg.destroy({ where: { Cliente_id: id } }); // Deleta RGs antigos
      for (const rg of Rgs) {
        await Rg.create({
          Rg_valor: rg,
          Cliente_id: id,
        });
      }

      await Telefone.destroy({ where: { Cliente_id: id } }); // Deleta Telefone antigos
      for (const telefone of Telefones) {
        await Telefone.create({
          Tel_ddd: telefone['Tel_ddd'],
            Tel_numero: telefone['Tel_numero'],
            Cliente_id: id
        });
      }

      if (updatedCliente || updatedEndereco) {
        const clienteAtualizado = await Cliente.findByPk(id, {
          include: [CliEndereco, Rg], 
        });
        return res.status(200).json({
          message: 'Cliente atualizado com sucesso!',
          cliente: clienteAtualizado,
        });
      }

      return res.status(400).json({ message: 'Nenhuma alteração realizada no cliente.' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro de requisição para atualizar cliente', details: error.message});
    }
  },

  // DELETE / Remover um cliente
  deleteCliente: async(req: Request, resp: Response) => {
    const {id} =  req.params
      try {
        const deleted = await Cliente.destroy({where: {Cli_id: id}})
        return resp.status(200).json(deleted)
      } catch (error) {
        resp.status(400).json({error: 'Erro ao deletar cliente'})
      }
  }
};