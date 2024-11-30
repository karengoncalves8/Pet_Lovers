import { useState } from 'react';
import './style.css';
import { CardPaper } from '../../components/customMUI';
import { BarChart } from '@mui/x-charts/BarChart';

const Dashboard: React.FC = () => {
    const [topClientes] = useState([
        { rank: 1, nome: "Ana Clara Silva", quantidade: 120 },
        { rank: 2, nome: "Carlos Eduardo Santos", quantidade: 110 },
        { rank: 3, nome: "Mariana Oliveira", quantidade: 105 },
        { rank: 4, nome: "Lucas Almeida", quantidade: 100 },
        { rank: 5, nome: "Bianca Ribeiro", quantidade: 95 },
        { rank: 6, nome: "Fernanda Souza", quantidade: 90 },
        { rank: 7, nome: "Gustavo Costa", quantidade: 85 },
        { rank: 8, nome: "Isabela Pereira", quantidade: 80 },
        { rank: 9, nome: "Rafael Mendes", quantidade: 75 },
        { rank: 10, nome: "Juliana Lima", quantidade: 70 },
    ]);

    const [data] = useState([
        { month: 'Janeiro', produtos: 30, servicos: 20 },
        { month: 'Fevereiro', produtos: 50, servicos: 40 },
        { month: 'Março', produtos: 20, servicos: 30 },
        { month: 'Abril', produtos: 60, servicos: 50 },
    ]);

    return (
        <main className="tabela">
            <h1 className="page-title">Dashboard</h1>
            
            <div className="dashboard-cards">
                <CardPaper className="top-clients">
                    <div className="card-title">
                        <h3>Consumo de Clientes</h3>
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
                            {topClientes.map((cliente, index) => (
                                <tr key={index}>
                                    <td>{cliente.rank}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.quantidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardPaper>
                <CardPaper className="graph-serv-prod">
                    <div className="card-title">
                        <h3>Consumo de Serviços e Produtos</h3>
                    </div>
                    <BarChart
                        xAxis={[
                            {
                                data: data.map((d) => d.month),
                                label: 'Meses',
                                scaleType: 'band',
                            },
                        ]}
                        yAxis={[
                            {
                                label: 'Quantidade',
                            },
                        ]}
                        series={[
                            {
                                data: data.map((d) => d.produtos),
                                label: 'Produtos',
                                color: '#2578A1',
                            },
                            {
                                data: data.map((d) => d.servicos),
                                label: 'Serviços',
                                color: '#2D3748',
                            },
                        ]}
                        height={300}
                        className="graph"
                    />
                </CardPaper>
            </div>
        </main>
    );
};

export default Dashboard;
