import Cliente from "./Cliente"
import Pet from "./Pet"
import Produto from "./Produto"
import Servico from "./Servico"

export default class Venda{
    private cliente: Cliente
    private pet: Pet
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>

    constructor(cliente:Cliente, pet: Pet, produtosConsumidos: Array<Produto>, servicosConsumidos: Array<Servico>){
        this.cliente = cliente,
        this.pet = pet,
        this.produtosConsumidos = produtosConsumidos,
        this.servicosConsumidos = servicosConsumidos
    }

    public get getCliente(): Cliente{
        return this.cliente
    }

    public get getPet(): Pet{
        return this.pet
    }

    public get getValorTotal(): number{
        let valorTotal = 0
        this.servicosConsumidos.forEach(servico => valorTotal += servico.getValor)
        this.produtosConsumidos.forEach(produto => valorTotal += produto.getValor)
        return valorTotal
    }

    public get getProdutosConsumidos(): Array<Produto>{
        return this.produtosConsumidos
    }

    public get getServicosConsumidos(): Array<Servico>{
        return this.servicosConsumidos
    }

    public get totalItensConsumidos(): number{
        return this.servicosConsumidos.length + this.produtosConsumidos.length
    }

}