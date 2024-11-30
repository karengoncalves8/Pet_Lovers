import express, { Request, Response } from 'express';
import { Cliente } from "../models/Cliente"
import { Venda } from "../models/Venda"
import { VendaItens } from '../models/VendaItens';
import { Pet } from '../models/Pet';
import { Consumiveis } from '../models/Consumiveis';

export const controllerEstatisticas = {
    clientesConsumoValor:  async (req: Request, res: Response) =>{
        try{
            const vendas = await Venda.findAll({
                include: [
                    {
                        model: Cliente,
                    }
                ],
            })

            if(!vendas){
                return res.status(400).json({message: 'erro ao encontrar vendas'})
            }

            const lista = []
            vendas.forEach((v) => {
                const existente = lista.find((v) => v['Cliente'] === v['Cliente']['Cli_nome'])
                if(existente){
                    existente['Consumo'] += v['Venda_total']
                    return
                }
                const cliente = v['Cliente']['Cli_nome']
                const consumo = v['Venda_total']
                lista.push({
                    Cliente: cliente,
                    Consumo: consumo,
                })
            })
            const listaOrdenada = lista.sort((a, b) => b['Consumo'] - a['Consumo'])

            return res.status(200).json(listaOrdenada)
        }catch(error){
            res.status(500).json({error: `Erro ao acessar vendas: ${error}`})
        }
    },

    clientesConsumoQuantidade: async (req: Request, res: Response) => {
        try {
            const vendas = await Venda.findAll({
                include: [
                    {
                        model: Cliente,
                    },
                    {
                        model: VendaItens,
                    },
                ],
            });
    
            if (!vendas) {
                return res.status(400).json({ message: 'Erro ao encontrar vendas' });
            }
    
            const consumoPorCliente: Record<string, number> = {};
    
            vendas.forEach((venda) => {
                const clienteNome = venda['Cliente']['Cli_nome'];
                if (!consumoPorCliente[clienteNome]) {
                    consumoPorCliente[clienteNome] = 0; 
                }
    
                venda['Venda_itens'].forEach((item) => {
                    const quantidade = item['VenItens_quantidade'];
                    consumoPorCliente[clienteNome] += quantidade; 
                });
            });
    
            const listaOrdenada = Object.entries(consumoPorCliente)
                .map(([Cliente, Quantidade]) => ({ Cliente, Quantidade: Number(Quantidade) }))
                .sort((a, b) => b['Quantidade'] - a['Quantidade']);
    
            return res.status(200).json(listaOrdenada);
        } catch (error) {
            res.status(500).json({ error: `Erro ao acessar vendas: ${error}` });
        }
    },
        
    consumiveisConsumo: async (req: Request, res: Response) => {
        try {
            const vendas = await Venda.findAll({
                include: [
                    {
                        model: VendaItens,
                        include: [
                            {
                                model: Consumiveis,
                            },
                        ],
                    },
                ],
            });
    
            if (!vendas) {
                return res.status(400).json({ message: 'Erro ao encontrar vendas' });
            }
    
            const consumoPorConsumivel: Record<string, number> = {};
    
            vendas.forEach((venda) => {
                venda['Venda_itens'].forEach((item) => {
                    const consumivelNome = item['Consumiveis']['Cons_nome'];
                    const quantidade = item['VenItens_quantidade'];
    
                    if (!consumoPorConsumivel[consumivelNome]) {
                        consumoPorConsumivel[consumivelNome] = 0; 
                    }
    
                    consumoPorConsumivel[consumivelNome] += quantidade; 
                });
            });
    
            const listaOrdenada = Object.entries(consumoPorConsumivel)
                .map(([consumivel, quantidade]) => ({ consumivel, quantidade }))
                .sort((a, b) => b['quantidade'] - a['quantidade']);
    
            return res.status(200).json(listaOrdenada);
        } catch (error) {
            res.status(500).json({ error: `Erro ao acessar vendas: ${error}` });
        }
    },

    consumiveisConsumoPorTipoPet: async (req: Request, res: Response) => {
        try {
            const vendas = await Venda.findAll({
                include: [
                    {
                        model: VendaItens,
                        include: [
                            {
                                model: Consumiveis,
                            },
                            {
                                model: Pet,
                            },
                        ],
                    },
                ],
            });
    
            if (!vendas) {
                return res.status(400).json({ message: 'Erro ao encontrar vendas' });
            }

            const consumoPorTipoPet: Record<string, Record<string, number>> = {};
    
            vendas.forEach((venda) => {
                venda['Venda_itens'].forEach((item) => {
                    const consumivelNome = item['Consumiveis']['Cons_nome'];
                    const quantidade = item['VenItens_quantidade'];
    
                    item['Pets'].forEach((pet) => {
                        const petTipo = pet['Pet_tipo'].toLowerCase();
    
                        if (!consumoPorTipoPet[petTipo]) {
                            consumoPorTipoPet[petTipo] = {};
                        }
    
                        if (!consumoPorTipoPet[petTipo][consumivelNome]) {
                            consumoPorTipoPet[petTipo][consumivelNome] = 0;
                        }
    
                        consumoPorTipoPet[petTipo][consumivelNome] += quantidade;
                    });
                });
            });
    
            const resultado = Object.entries(consumoPorTipoPet).map(([petTipo, consumiveis]) => ({
                pet_tipo: petTipo,
                consumiveis: Object.entries(consumiveis)
                    .map(([consumivel, quantidade]) => ({ consumivel, quantidade }))
                    .sort((a, b) => b['quantidade'] - a['quantidade']),
            }));
    
            return res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: `Erro ao acessar vendas: ${error}` });
        }
    },
    
    
    consumiveisConsumoPorTipoRaca: async (req: Request, res: Response) => {
        try {
            const vendas = await Venda.findAll({
                include: [
                    {
                        model: VendaItens,
                        include: [
                            {
                                model: Consumiveis,
                            },
                            {
                                model: Pet,
                            },
                        ],
                    },
                ],
            });
    
            if (!vendas) {
                return res.status(400).json({ message: 'Erro ao encontrar vendas' });
            }
    
            const consumoPorRaca: Record<string, Record<string, number>> = {};
    
            vendas.forEach((venda) => {
                venda['Venda_itens'].forEach((item) => {
                    const consumivelNome = item['Consumiveis']['Cons_nome'];
                    const quantidade = item['VenItens_quantidade']
    
                    item['Pets'].forEach((pet) => {
                        const petRaca = pet['Pet_raca'].toLowerCase();
    
                        if (!consumoPorRaca[petRaca]) {
                            consumoPorRaca[petRaca] = {};
                        }
    
                        if (!consumoPorRaca[petRaca][consumivelNome]) {
                            consumoPorRaca[petRaca][consumivelNome] = 0;
                        }
    
                        consumoPorRaca[petRaca][consumivelNome] += quantidade;
                    });
                });
            });
    
            const resultado = Object.entries(consumoPorRaca).map(([petRaca, consumiveis]) => ({
                pet_raca: petRaca,
                consumiveis: Object.entries(consumiveis)
                    .map(([consumivel, quantidade]) => ({ consumivel, quantidade }))
                    .sort((a, b) => b['quantidade'] - a['quantidade']),
            }));
    
            return res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: `Erro ao acessar vendas: ${error}` });
        }
    }
}