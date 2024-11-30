import { Cliente } from '../models/Cliente';
import { Consumiveis } from '../models/Consumiveis';
import { CliEndereco } from '../models/Endereco';
import { Pet } from '../models/Pet';
import { Rg } from '../models/RG';
import { Telefone } from '../models/Telefone';
import { Venda } from '../models/Venda';
import { VendaItens } from '../models/VendaItens';
import { VendaItensPets } from '../models/VendaItensPets';
import sequelize from './db';


export default async function init() {
    try {
        // Sincronizar o banco de dados (criar tabelas se não existirem)
        await sequelize.sync({ force: true });
    
        console.log('Banco de dados sincronizado.');
    
        // Populando Clientes
        const clientes = await Cliente.bulkCreate([
          { Cli_nome: 'João Silva', Cli_nomeSocial: 'Joãozinho', Cli_email: 'joao@example.com', Cli_cpf: '12345678901' },
          { Cli_nome: 'Maria Santos', Cli_nomeSocial: 'Mariazinha', Cli_email: 'maria@example.com', Cli_cpf: '98765432100' },
          { Cli_nome: 'Carlos Souza', Cli_nomeSocial: 'Carlito', Cli_email: 'carlos@example.com', Cli_cpf: '11122233344' },
          { Cli_nome: 'Ana Oliveira', Cli_nomeSocial: 'Aninha', Cli_email: 'ana@example.com', Cli_cpf: '55566677788' },
          { Cli_nome: 'Pedro Lima', Cli_nomeSocial: 'Pedrinho', Cli_email: 'pedro@example.com', Cli_cpf: '99988877766' },
        ]);
    
        console.log('Clientes criados.');
    
        // Populando Telefones
        await Telefone.bulkCreate([
          { Tel_ddd: 11, Tel_numero: 999999999, Cliente_id: clientes[0].Cli_id },
          { Tel_ddd: 21, Tel_numero: 888888888, Cliente_id: clientes[1].Cli_id },
          { Tel_ddd: 31, Tel_numero: 777777777, Cliente_id: clientes[2].Cli_id },
          { Tel_ddd: 41, Tel_numero: 666666666, Cliente_id: clientes[3].Cli_id },
          { Tel_ddd: 51, Tel_numero: 555555555, Cliente_id: clientes[4].Cli_id },
        ]);
    
        console.log('Telefones criados.');
    
        // Populando RGs
        await Rg.bulkCreate([
          { Rg_valor: '12.345.678-9', Cliente_id: clientes[0].Cli_id },
          { Rg_valor: '98.765.432-1', Cliente_id: clientes[1].Cli_id },
          { Rg_valor: '11.222.333-4', Cliente_id: clientes[2].Cli_id },
          { Rg_valor: '55.666.777-8', Cliente_id: clientes[3].Cli_id },
          { Rg_valor: '99.888.777-6', Cliente_id: clientes[4].Cli_id },
        ]);
    
        console.log('RGs criados.');
    
        // Populando Endereços
        await CliEndereco.bulkCreate([
          { End_estado: 'SP', End_cidade: 'São Paulo', End_bairro: 'Centro', End_rua: 'Rua A', End_numero: 100, End_codPostal: '01000-000', Cliente_id: clientes[0].Cli_id },
          { End_estado: 'RJ', End_cidade: 'Rio de Janeiro', End_bairro: 'Copacabana', End_rua: 'Rua B', End_numero: 200, End_codPostal: '22000-000', Cliente_id: clientes[1].Cli_id },
          { End_estado: 'MG', End_cidade: 'Belo Horizonte', End_bairro: 'Savassi', End_rua: 'Rua C', End_numero: 300, End_codPostal: '31000-000', Cliente_id: clientes[2].Cli_id },
          { End_estado: 'PR', End_cidade: 'Curitiba', End_bairro: 'Batel', End_rua: 'Rua D', End_numero: 400, End_codPostal: '80000-000', Cliente_id: clientes[3].Cli_id },
          { End_estado: 'RS', End_cidade: 'Porto Alegre', End_bairro: 'Moinhos', End_rua: 'Rua E', End_numero: 500, End_codPostal: '90000-000', Cliente_id: clientes[4].Cli_id },
        ]);
    
        console.log('Endereços criados.');
    
        // Populando Pets
        const pets = await Pet.bulkCreate([
          { Pet_nome: 'Rex', Pet_tipo: 'Cachorro', Pet_raca: 'Labrador', Pet_genero: 'Macho', Cliente_id: clientes[0].Cli_id },
          { Pet_nome: 'Mia', Pet_tipo: 'Gato', Pet_raca: 'Siames', Pet_genero: 'Fêmea', Cliente_id: clientes[1].Cli_id },
          { Pet_nome: 'Thor', Pet_tipo: 'Cachorro', Pet_raca: 'Pastor Alemão', Pet_genero: 'Macho', Cliente_id: clientes[2].Cli_id },
          { Pet_nome: 'Luna', Pet_tipo: 'Gato', Pet_raca: 'Persa', Pet_genero: 'Fêmea', Cliente_id: clientes[3].Cli_id },
          { Pet_nome: 'Bobby', Pet_tipo: 'Cachorro', Pet_raca: 'Beagle', Pet_genero: 'Macho', Cliente_id: clientes[4].Cli_id },
        ]);
    
        console.log('Pets criados.');
    
        // Populando Consumíveis
        const consumiveis = await Consumiveis.bulkCreate([
          { Cons_nome: 'Banho', Cons_descricao: 'Banho para pets', Cons_valor: '50.00', Cons_tipo: 'Servico' },
          { Cons_nome: 'Tosa', Cons_descricao: 'Tosa para cães', Cons_valor: '70.00', Cons_tipo: 'Servico' },
          { Cons_nome: 'Ração Premium', Cons_descricao: 'Ração para cães de alta qualidade', Cons_valor: '120.00', Cons_tipo: 'Produto' },
          { Cons_nome: 'Brinquedo de Borracha', Cons_descricao: 'Brinquedo resistente para cães', Cons_valor: '30.00', Cons_tipo: 'Produto' },
          { Cons_nome: 'Areia para Gatos', Cons_descricao: 'Areia sanitária para gatos', Cons_valor: '20.00', Cons_tipo: 'Produto' },
        ]);
    
        console.log('Consumíveis criados.');
    
        // Populando Vendas
        const vendas = await Venda.bulkCreate([
          { Venda_total: '150.00', Cliente_id: clientes[0].Cli_id },
          { Venda_total: '250.00', Cliente_id: clientes[1].Cli_id },
          { Venda_total: '100.00', Cliente_id: clientes[2].Cli_id },
          { Venda_total: '80.00', Cliente_id: clientes[3].Cli_id },
          { Venda_total: '300.00', Cliente_id: clientes[4].Cli_id },
        ]);
    
        console.log('Vendas criadas.');
    
        // Populando VendaItens
        const vendaItens = await VendaItens.bulkCreate([
          { Venda_id: vendas[0].Venda_id, Cons_id: consumiveis[0].Cons_id, VenItens_quantidade: 2, VenItens_total: '100.00' },
          { Venda_id: vendas[1].Venda_id, Cons_id: consumiveis[1].Cons_id, VenItens_quantidade: 1, VenItens_total: '70.00' },
          { Venda_id: vendas[2].Venda_id, Cons_id: consumiveis[2].Cons_id, VenItens_quantidade: 3, VenItens_total: '360.00' },
          { Venda_id: vendas[3].Venda_id, Cons_id: consumiveis[3].Cons_id, VenItens_quantidade: 4, VenItens_total: '120.00' },
          { Venda_id: vendas[4].Venda_id, Cons_id: consumiveis[4].Cons_id, VenItens_quantidade: 5, VenItens_total: '100.00' },
        ]);
    
        console.log('VendaItens criados.');

        await VendaItensPets.bulkCreate([
            { Pet_id: pets[0].Pet_id, VenItens_id: vendaItens[0].VenItens_id },
            { Pet_id: pets[1].Pet_id, VenItens_id: vendaItens[1].VenItens_id },
            { Pet_id: pets[2].Pet_id, VenItens_id: vendaItens[2].VenItens_id },
            { Pet_id: pets[3].Pet_id, VenItens_id: vendaItens[3].VenItens_id },
            { Pet_id: pets[4].Pet_id, VenItens_id: vendaItens[4].VenItens_id },
          ]);
      
          console.log('VendaItensPets criados.');
      
          console.log('Banco de dados populado com sucesso!');
        } catch (error) {
          console.error('Erro ao popular banco de dados:', error);
        }
}