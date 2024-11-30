import Produto from "../../models/Produto";
import Servico from "../../models/Servico";
import Venda from "../../models/Venda";
import Listagem from "../Listagem";

export default class ServicoProdConsumoPorTipoPet extends Listagem {
    private vendas: Array<Venda>;

    constructor(vendas: Array<Venda>) {
        super();
        this.vendas = vendas;
    }

    public listar() {
        console.log('\n========== Produtos ou Serviços mais consumidos por tipo de pet ==========\n');

        // Mapa para armazenar consumos agrupados por tipo de pet
        const consumoPorTipoPet: Map<string, Map<Produto | Servico, number>> = new Map();

        // Itera sobre as vendas
        this.vendas.forEach(venda => {
            const tipoPet = venda.getPet.getTipo; // Obtém o tipo do pet associado à venda
            const servicosConsumidos = venda.getServicosConsumidos;
            const produtosConsumidos = venda.getProdutosConsumidos;

            // Garante que o tipo de pet existe no mapa
            if (!consumoPorTipoPet.has(tipoPet)) {
                consumoPorTipoPet.set(tipoPet, new Map());
            }

            // Obtém o mapa de consumo para esse tipo de pet
            const consumo = consumoPorTipoPet.get(tipoPet)!;

            // Adiciona serviços consumidos ao mapa
            servicosConsumidos.forEach(servico => {
                if (consumo.has(servico)) {
                    consumo.set(servico, (consumo.get(servico) || 0) + 1);
                } else {
                    consumo.set(servico, 1);
                }
            });

            // Adiciona produtos consumidos ao mapa
            produtosConsumidos.forEach(produto => {
                if (consumo.has(produto)) {
                    consumo.set(produto, (consumo.get(produto) || 0) + 1);
                } else {
                    consumo.set(produto, 1);
                }
            });
        });

        // Exibe os resultados por tipo de pet
        consumoPorTipoPet.forEach((consumo, tipoPet) => {
            console.log(`\n=== Tipo de Pet: ${tipoPet} ===`);

            const consumoArray = Array.from(consumo.entries()).map(([item, quantidade]) => ({
                item,
                quantidade,
            }));

            consumoArray.sort((a, b) => b.quantidade - a.quantidade);

            // Exibe os 10 itens mais consumidos para esse tipo de pet
            consumoArray.slice(0, 10).forEach((consumoItem, index) => {
                console.log(`${index + 1}. ${consumoItem.item.nome} - Consumido ${consumoItem.quantidade} vezes`);
            });
        });
    }
}
