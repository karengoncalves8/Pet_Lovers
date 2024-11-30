import Cliente from "../../models/Cliente";
import Produto from "../../models/Produto";
import Servico from "../../models/Servico";
import Venda from "../../models/Venda";
import Entrada from "../../utils/Entrada";
import Consumir from "../Consumir";

export default class Consumo extends Consumir{
    private servicos: Array<Servico>
    private produtos: Array<Produto>
    private clientes: Array<Cliente>
    private vendas: Array<Venda>
    private entrada: Entrada

    constructor(servicos: Array<Servico>, clientes: Array<Cliente>, produtos: Array<Produto>, vendas: Array<Venda>){
        super()
        this.servicos = servicos
        this.clientes = clientes
        this.produtos = produtos
        this.vendas = vendas
        this.entrada = new Entrada
    }

    public consumir(){
        console.log('\n ========== Consumir ========== ')

        let cpf = this.entrada.receberTexto('Por favor insira o CPF do cliente que irá consumir: ')
        let cliente = this.clientes.find(cliente => cliente.getCPF.getValor == cpf)

        if(cliente){
            console.log('Escolha o pet a qual será destinado:')
            let clientePets = cliente.getPets
            if(clientePets.length > 0){
                clientePets.forEach((item, index) => {
                    console.log(`${index} - ${item.getNome}`)
                })
            }
            else{
                console.log('Não há pets cadastrados para esse cliente.')
            }

            let petIndex = this.entrada.receberNumero('Opção escolhida: ')
            let pet = clientePets[petIndex]
    
            if(pet){
                let execucaoVenda = true
                let servicosConsumidos = []
                let produtosConsumidos = []

                while(execucaoVenda){
                    console.log(`\nO que deseja consumir?
                        1 - Serviço
                        2 - Produto
                        0 - Encerrar venda `)
                    
                    let opcao = this.entrada.receberNumero('Opção escolhida: ')
                    switch(opcao){
                        case 1:
                            console.log('Escolha um serviço para consumir:')
                            if(this.servicos.length > 0){
                                this.servicos.forEach((item, index) => {
                                    console.log(`${index} - ${item.nome}`)
                                })
                            }
                            else{
                                console.log('Não há serviços cadastrados.')
                            }
                    
                            let servicoIndex = this.entrada.receberNumero('Opção escolhida: ')
                            let servico = this.servicos[servicoIndex]
                    
                            if(servico){
                                servicosConsumidos.push(servico)
                                console.log('Serviço consumido!')
                            }
                            else{
                                console.log('Opção inválida.')
                            }
                            break
                        case 2:
                            console.log('Escolha um produto para consumir:')
                            if(this.produtos.length > 0){
                                this.produtos.forEach((item, index) => {
                                    console.log(`${index} - ${item.nome}`)
                                })
                            }
                            else{
                                console.log('Não há produtos cadastrados.')
                            }
                    
                            let produtoIndex = this.entrada.receberNumero('Opção escolhida: ')
                            let produto = this.produtos[produtoIndex]
                    
                            if(produto){
                                produtosConsumidos.push(produto)
                                console.log('Produto consumido!')
                            }
                            else{
                                console.log('Opção inválida.')
                            }
                            break
                        case 0:
                            let venda = new Venda(cliente, pet, produtosConsumidos, servicosConsumidos)
                            this.vendas.push(venda)
                            console.log(`Venda registrada com sucesso! Total: R$${venda.getValorTotal}`)
                            execucaoVenda = false
                            break
                        default:
                            console.log('Opção inválida.')
                    }
                }
            }
            else{
                console.log('Opção inválida.')
            }
        }
        else{
            console.log('Nenhum cliente encontrado com o CPF informado.')
        }

    }
}