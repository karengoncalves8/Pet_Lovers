import CadastroCliente from "../services/Cliente/CadastroCliente";
import Empresa from "../models/Empresa";
import Entrada from "../utils/Entrada";
import ListarClientes from "../services/Cliente/ListarClientes";
import AdicionarCliente from "../services/Cliente/AdicionarCliente";
import EditarCliente from "../services/Cliente/EditarCliente";
import RemoverCliente from "../services/Cliente/RemoverCliente";
import CadastrarPet from "../services/Pets/CadastrarPet";
import ListarPets from "../services/Pets/ListarPets";
import EditarPet from "../services/Pets/EditarPet";
import RemoverPet from "../services/Pets/RemoverPet";
import CadastrarServico from "../services/Serviços/CadastrarServico";
import ListarServicos from "../services/Serviços/ListarServicos";
import EditarServico from "../services/Serviços/EditarServico";
import RemoverServico from "../services/Serviços/RemoverServico";
import CadastrarProduto from "../services/Produtos/CadastrarProduto";
import ListarProdutos from "../services/Produtos/ListarProdutos";
import EditarProduto from "../services/Produtos/EditarProduto";
import RemoverProduto from "../services/Produtos/RemoverProduto";
import Consumo from "../services/Consumo/Venda";
import Clientes10ConsumoQtd from "../services/Listagens/ListarClientesConsumoQtd";
import ServicoProdConsumo from "../services/Listagens/ServicoProdConsumo";
import ServicoProdConsumoPorTipoPet from "../services/Listagens/ListarServProdTipoPet";
import ServicoProdConsumoPorRacaPet from "../services/Listagens/ListarServProdTipoRaca";
import Clientes10ConsumoValor from "../services/Listagens/ListarClientesConsumoValor";


console.log('============= Bem-vindo ao PetLovers =============')

let empresa = new Empresa()
let execucao = true

while(execucao){
    let entrada = new Entrada()

    console.log(`\nOpções:
        1 - Clientes
        2 - Pets
        3 - Serviços
        4 - Produtos
        5 - Consumir
        0 - Sair `)

    let opcao = entrada.receberNumero('Escolha uma opção: ')

    switch(opcao){
        case 1:
            do{
                console.log('\n======== Clientes ========')
                
                console.log(`\nOpções:
                    1 - Cadastrar Cliente
                    2 - Listar Clientes
                    3 - Adicionar Informações ao Cliente
                    4 - Editar Cliente
                    5 - Excluir Cliente
                    0 - Voltar `)

                opcao = entrada.receberNumero('Escolha uma opção: ')
            
                switch(opcao){
                    case 1:
                        let cadastro = new CadastroCliente(empresa.getClientes)
                        cadastro.cadastrar()
                        break
                    case 2:
                        let listar = new ListarClientes(empresa.getClientes)
                        listar.listar()
                        break
                    case 3:
                        let adicionar = new AdicionarCliente(empresa.getClientes)
                        adicionar.adicionar()
                        break
                    case 4: 
                        let editar = new EditarCliente(empresa.getClientes)
                        editar.editar()
                        break
                    case 5:
                        let remover = new RemoverCliente(empresa.getClientes)
                        remover.remover()
                        break
                    case 0:
                        break
                    default:
                        console.log('Opção inválida.')
                }
            } while(opcao !== 0)
            break
        case 2:
            do{
                console.log('\n======== Pets ========')
                
                console.log(`\nOpções:
                    1 - Cadastrar Pet
                    2 - Listar Pets
                    3 - Editar Pet
                    4 - Excluir Pet
                    0 - Voltar `)
                    
                opcao = entrada.receberNumero('Escolha uma opção: ')
            
                switch(opcao){
                    case 1:
                        let cadastro = new CadastrarPet(empresa.getClientes)
                        cadastro.cadastrar()
                        break
                    case 2:
                        let listar = new ListarPets(empresa.getClientes)
                        listar.listar()
                        break
                    case 3: 
                        let editar = new EditarPet(empresa.getClientes)
                        editar.editar()
                        break
                    case 4:
                        let remover = new RemoverPet(empresa.getClientes)
                        remover.remover()
                        break
                    case 0:
                        break
                    default:
                        console.log('Opção inválida.')
                }
            } while(opcao !== 0)
            break
        case 3: 
            do{
                console.log('\n======== Serviços ========')
                
                console.log(`\nOpções:
                    1 - Cadastrar Serviço
                    2 - Listar Serviços
                    3 - Editar Serviço
                    4 - Excluir Serviço
                    0 - Voltar `)

                opcao = entrada.receberNumero('Escolha uma opção: ')
            
                switch(opcao){
                    case 1:
                        let cadastro = new CadastrarServico(empresa.getServicos)
                        cadastro.cadastrar()
                        break
                    case 2:
                        let listar = new ListarServicos(empresa.getServicos)
                        listar.listar()
                        break
                    case 3: 
                        let editar = new EditarServico(empresa.getServicos)
                        editar.editar()
                        break
                    case 4:
                        let remover = new RemoverServico(empresa.getServicos)
                        remover.remover()
                        break
                    case 0:
                        break
                    default:
                        console.log('Opção inválida.')
                }
            } while(opcao !== 0)
            break
        case 4: 
            do{
                console.log('\n======== Produtos ========')
                
                console.log(`\nOpções:
                    1 - Cadastrar Produto
                    2 - Listar Produtos
                    3 - Editar Produto
                    4 - Excluir Produto
                    0 - Voltar `)

                opcao = entrada.receberNumero('Escolha uma opção: ')
            
                switch(opcao){
                    case 1:
                        let cadastro = new CadastrarProduto(empresa.getProdutos)
                        cadastro.cadastrar()
                        break
                    case 2:
                        let listar = new ListarProdutos(empresa.getProdutos)
                        listar.listar()
                        break
                    case 3: 
                        let editar = new EditarProduto(empresa.getProdutos)
                        editar.editar()
                        break
                    case 4:
                        let remover = new RemoverProduto(empresa.getProdutos)
                        remover.remover()
                        break
                    case 0:
                        break
                    default:
                        console.log('Opção inválida.')
                }
            } while(opcao !== 0)
            break
        case 5: 
            console.log('\n======== Consumir ========')
            let consumir = new Consumo(empresa.getServicos, empresa.getClientes, empresa.getProdutos, empresa.getVendas) 
            consumir.consumir()
            break
        case 6: 
            do{
                console.log('\n======== Listagens ========')
                
                console.log(`\nOpções:
                    1 - 10 Clientes que mais consumiram por quantidade
                    2 - Produtos ou serviços mais consumidos
                    3 - Produtos ou serviços mais consumidos por tipo de Pet
                    4 - Produtos ou serviços mais consumidos por raça de Pet
                    5 - 10 Clientes que mais consumiram por valor
                    0 - Voltar `)

                opcao = entrada.receberNumero('Escolha uma opção: ')
            
                switch(opcao){
                    case 1:
                        let listarClienteQtd = new Clientes10ConsumoQtd(empresa.getVendas)
                        listarClienteQtd.listar()
                        break
                    case 2:
                        let listarServicoProdConsumo = new ServicoProdConsumo(empresa.getVendas)
                        listarServicoProdConsumo.listar()
                        break
                    case 3: 
                        let listarPorTipo = new ServicoProdConsumoPorTipoPet(empresa.getVendas)
                        listarPorTipo.listar()
                        break
                    case 4:
                        let listarPorRaca = new ServicoProdConsumoPorRacaPet(empresa.getVendas)
                        listarPorRaca.listar()
                        break
                    case 5:
                        let listarClienteValor = new Clientes10ConsumoValor(empresa.getVendas)
                        listarClienteValor.listar()
                        break
                    case 0:
                        break
                    default:
                        console.log('Opção inválida.')
                }
            } while(opcao !== 0)
            break
        case 0:
            execucao = false
            break
        default:
            console.log('Opção inválida.')
    }
}


