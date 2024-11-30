import { useEffect, useState } from 'react';
import './style.css';
import { CardPaper } from '../../components/customMUI';
import { BarChart } from '@mui/x-charts/BarChart';
import GraficoConsumiveisPorTipoPet from '../../components/Graphs/consumoPorTipoPet';
import { ConsumoClienteQuantidade, ConsumoClienteValor, estatisticasServices } from '../../services/estatisticasServices';
import { ApiException } from '../../config/apiConfig';
import GraficoConsumoConsumiveis from '../../components/Graphs/consumoConsumiveis';
import GraficoConsumiveisPorRacaPet from '../../components/Graphs/consumoPorTipoRaca';

const Dashboard: React.FC = () => {
    const [ clienteConsumoValor, setCienteConsumoValor ] = useState<ConsumoClienteValor[]>([])
    const [ clienteConsumoQuantidade, setCienteConsumoQuantidade ] = useState<ConsumoClienteQuantidade[]>([])

    const fetchClienteConsumoValor = async () => {
        const result = await estatisticasServices.getClienteConsumoValor()
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          setCienteConsumoValor(result.slice(0, 10));
        }
    }

    const fetchClienteConsumoQuantidade = async () => {
        const result = await estatisticasServices.getClienteConsumoQuantidade()
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          setCienteConsumoQuantidade(result.slice(0, 10));
        }
    }

    useEffect(() => {
        fetchClienteConsumoQuantidade()
        fetchClienteConsumoValor()
    }, [])
    
    return (
        <main className="tabela">
            <h1 className="page-title">Dashboard</h1>
            
            <div className="dashboard-cards">
                <div className="row-1">
                    <CardPaper className="top-clients">
                        <div className="card-title">
                            <h3>Consumo de Clientes por Valor</h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Cliente</th>
                                    <th>Consumo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clienteConsumoValor.map((data, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.Cliente}</td>
                                        <td>R${data.Consumo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardPaper>
                    <CardPaper className="top-clients">
                        <div className="card-title">
                            <h3>Consumo de Clientes por Quantidade</h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Cliente</th>
                                    <th>Consumo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clienteConsumoQuantidade.map((data, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.Cliente}</td>
                                        <td>{data.Quantidade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardPaper>
                    <CardPaper className="graph-card">
                        <div className="card-title">
                            <h3>Consumo de Produtos e Serviços</h3>
                        </div>
                        <GraficoConsumoConsumiveis/>
                    </CardPaper>
                </div>
                
                <div className="row-2">
                    <CardPaper className="graph-card">
                        <div className="card-title">
                            <h3>Consumo de Produtos e Serviços por Tipo de Pet</h3>
                        </div>
                        <GraficoConsumiveisPorTipoPet/>
                    </CardPaper>
                    <CardPaper className="graph-card">
                        <div className="card-title">
                            <h3>Consumo de Produtos e Serviços por Raça de Pet</h3>
                        </div>
                        <GraficoConsumiveisPorRacaPet/>
                    </CardPaper>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
