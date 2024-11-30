import { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

import emptyCart from '../../assets/EmptyCart.svg'

import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import { BlueButton, CardPaper } from '../../components/customMUI';
import { withRouter } from '../../routes/withRouter';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { GoTrash } from 'react-icons/go';
import { BarChart } from '@mui/x-charts/BarChart';

type state = {
    topClientes?: Array<{ rank: number; nome: string; quantidade: number; }>;
    data?: Array<{ month: string; produtos: number; servicos: number; }>
}

type props = {
    navigate: (path: string) => void;
};

class NovaVenda extends Component<props, state>{

    constructor(props: props) {
        super(props)

        this.state = {
            topClientes: [
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
            ],
            data: [
                { month: 'Janeiro', produtos: 30, servicos: 20 },
                { month: 'Fevereiro', produtos: 50, servicos: 40 },
                { month: 'Março', produtos: 20, servicos: 30 },
                { month: 'Abril', produtos: 60, servicos: 50 },
            ]
        }
    }
    
    render() {

        return (
            <main className='tabela'>
                <h1 className='page-title'>Dashboard</h1>
                
                <div className="dashboard-cards">
                    <CardPaper className='top-clients'>
                        <div className="card-title">
                            <h3>Consumo de Clientes</h3>
                        </div>
                        <table>
                            <thead>
                                <th>Rank</th>
                                <th>Cliente</th>
                                <th>Consumo</th>
                            </thead>
                            <tbody>
                                {this.state.topClientes.map((cliente, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{cliente.rank}</td>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.quantidade}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </CardPaper>
                    <CardPaper className='graph-serv-prod'>
                        <div className="card-title">
                            <h3>Consumo de Serviços e Produtos</h3>
                        </div>
                        <BarChart
                            xAxis={[
                                {
                                    data: this.state.data.map((d) => d.month), 
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
                                    data: this.state.data.map((d) => d.produtos), 
                                    label: 'Produtos',
                                    color: '#2578A1', 
                                },
                                {
                                    data: this.state.data.map((d) => d.servicos),
                                    label: 'Serviços',
                                    color: '#2D3748', 
                                },
                            ]}
                            height={300}
                            className='graph'
                        />
                    </CardPaper>
                </div>
            </main>
        )
    }
}

export default withRouter(NovaVenda);
