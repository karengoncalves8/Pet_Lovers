import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Cliente } from '../models/Cliente';
import { Consumiveis } from '../models/Consumiveis';
import { Venda } from '../models/Venda';
import { VendaItens } from '../models/VendaItens';
import { VendaItensPets } from '../models/VendaItensPets';
import { CliEndereco } from '../models/Endereco';
import { Rg } from '../models/RG';
import { Pet } from '../models/Pet';
import { Telefone } from '../models/Telefone';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST, 
    port: parseInt(process.env.DB_PORT),
    dialect: 'mysql',
    models: [Cliente, Consumiveis, Venda, VendaItens, VendaItensPets, CliEndereco, Rg, Pet, Telefone],
  });
  
  export default sequelize;