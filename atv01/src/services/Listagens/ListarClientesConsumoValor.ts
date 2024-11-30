import Cliente from "../../models/Cliente";
import Venda from "../../models/Venda";
import Listagem from "../Listagem";

export default class Clientes10ConsumoValor extends Listagem{
    private vendas: Array<Venda>

    constructor(vendas: Array<Venda>){
        super()
        this.vendas = vendas
    }

    public listar(){
        console.log('\n ========== 10 Clientes que mais consumiram em quantidade ========== ')

        const consumoPorCliente: Map<Cliente, number> = new Map();

        this.vendas.forEach(venda => {
            const cliente = venda.getCliente;
            const valorTotal = venda.getValorTotal;

            if (consumoPorCliente.has(cliente)) { // Se o cliente já estive no map
                consumoPorCliente.set(cliente, (consumoPorCliente.get(cliente) || 0) + valorTotal);
            } else {
                // Caso o cliente ainda não esteja, adiciona ao mapa
                consumoPorCliente.set(cliente, valorTotal);
            }
        });

        // Converte o mapa em uma array de objetos { cliente, totalItens }
        const consumoArray = Array.from(consumoPorCliente.entries()).map(([cliente, valorTotal]) => ({
            cliente,
            valorTotal,
        }));

        // Ordena os clientes pelo total de itens consumidos em ordem decrescente
        consumoArray.sort((a, b) => b.valorTotal - a.valorTotal);

        // Retorna os 10 primeiros clientes
        return consumoArray.slice(0, 10).forEach((item, index) => {
            console.log(`${index + 1}. ${item.cliente.nome} - Consumido R$${item.valorTotal}`);
        });
    }
}