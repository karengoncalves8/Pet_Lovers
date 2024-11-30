import Produto from "../../models/Produto";
import Servico from "../../models/Servico";
import Venda from "../../models/Venda";
import Listagem from "../Listagem";

export default class ServicoProdConsumoPorRacaPet extends Listagem {
    private vendas: Array<Venda>;

    constructor(vendas: Array<Venda>) {
        super();
        this.vendas = vendas;
    }

    public listar() {
        console.log('\n========== Produtos ou Serviços mais consumidos por raça de pet ==========\n');

        const consumoPorRacaPet: Map<string, Map<Produto | Servico, number>> = new Map();

        this.vendas.forEach(venda => {
            const racaPet = venda.getPet.getRaca; 
            const servicosConsumidos = venda.getServicosConsumidos;
            const produtosConsumidos = venda.getProdutosConsumidos;

            if (!consumoPorRacaPet.has(racaPet)) {
                consumoPorRacaPet.set(racaPet, new Map());
            }

            const consumo = consumoPorRacaPet.get(racaPet)!;

            servicosConsumidos.forEach(servico => {
                if (consumo.has(servico)) {
                    consumo.set(servico, (consumo.get(servico) || 0) + 1);
                } else {
                    consumo.set(servico, 1);
                }
            });

            produtosConsumidos.forEach(produto => {
                if (consumo.has(produto)) {
                    consumo.set(produto, (consumo.get(produto) || 0) + 1);
                } else {
                    consumo.set(produto, 1);
                }
            });
        });

        consumoPorRacaPet.forEach((consumo, racaPet) => {
            console.log(`\n=== Raça de Pet: ${racaPet} ===`);

            const consumoArray = Array.from(consumo.entries()).map(([item, quantidade]) => ({
                item,
                quantidade,
            }));

            consumoArray.sort((a, b) => b.quantidade - a.quantidade);

            consumoArray.slice(0, 10).forEach((consumoItem, index) => {
                console.log(`${index + 1}. ${consumoItem.item.nome} - Consumido ${consumoItem.quantidade} vezes`);
            });
        });
    }
}
