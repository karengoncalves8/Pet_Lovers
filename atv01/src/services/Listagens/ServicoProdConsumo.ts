import Produto from "../../models/Produto";
import Servico from "../../models/Servico";
import Venda from "../../models/Venda";
import Listagem from "../Listagem";

export default class ServicoProdConsumo extends Listagem{
    private vendas: Array<Venda>

    constructor(vendas: Array<Venda>){
        super()
        this.vendas = vendas
    }

    public listar(){
        console.log('\n ========== Produtos ou Serviços mais consumidos ========== ')

        const consumo: Map<Produto | Servico, number> = new Map();

        this.vendas.forEach(venda => {
            const servicosConsumidos = venda.getServicosConsumidos;
            const produtosConsumidos = venda.getProdutosConsumidos;

            servicosConsumidos.forEach(servico => {
                if (consumo.has(servico)) { 
                    consumo.set(servico, (consumo.get(servico) || 0) + 1);
                } else {
                    consumo.set(servico, 1);
                }
            })

            produtosConsumidos.forEach(produto => {
                if (consumo.has(produto)) { 
                    consumo.set(produto, (consumo.get(produto) || 0) + 1);
                } else {
                    consumo.set(produto, 1);
                }
            })
            
        });

        // Converte o mapa em uma array de objetos { cliente, totalItens }
        const consumoArray = Array.from(consumo.entries()).map(([servProd, quantidade]) => ({
            servProd,
            quantidade,
        }));

        // Ordena os produtos ou serviços pelo total de itens consumidos em ordem decrescente
        consumoArray.sort((a, b) => b.quantidade - a.quantidade);

        // Retorna os 10 primeiros serviços ou produtos
        return consumoArray.slice(0, 10).forEach((item, index) => {
            console.log(`${index + 1}. ${item.servProd.nome} - Consumido ${item.quantidade} vezes`);
        });

    }
}