import { Component } from 'react';

import './style.css';

import { HiOutlinePencil } from 'react-icons/hi2';
import { FaRegSave } from 'react-icons/fa';
import { LightBlueButton } from '../../customMUI';
import { Cliente } from '../../../pages/Clientes';
import { Venda } from '../../../pages/Vendas';


type state = {
    cliente?: string;
    pets?: Array<string>;
    valorTotal?: number;
    data?: Date; 
    produtosConsumidos?: Array<string>;
    servicosConsumidos?: Array<string>;
}

type props = {
    vendaInformations: Venda
};

export class VendaDetails extends Component<props, state>{

    constructor(props: props) {
        super(props)

        this.state = {
            cliente: '',
            pets: [''],
            valorTotal: 0,
            data: new Date(),
            produtosConsumidos: [''],
            servicosConsumidos: ['']
        }

    }

    render() {

        return (
            <div className="drawerCliente">
                <h2>Detalhes da Venda</h2>
                <div className='cliente-details '>
                    <span><strong>Cliente:</strong>{this.props.vendaInformations.cliente}</span>
                    <span><strong>Pets:</strong></span>
                    <ul>
                    {this.props.vendaInformations.pets.map((pet, index) => (
                        <li key={index}>{pet}</li>
                    ))}
                    </ul>
                    <span><strong>Valor Total:</strong>R$ {Number(this.props.vendaInformations.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span><strong>Data:</strong> {new Date(this.props.vendaInformations.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</span>
                    <span><strong>Produtos:</strong></span>
                    <ul>
                    {this.props.vendaInformations.produtosConsumidos.map((produto, index) => (
                        <li key={index}>{produto}</li>
                    ))}
                    </ul>
                    <span><strong>Serviços:</strong></span>
                    <ul>
                    {this.props.vendaInformations.servicosConsumidos.map((servico, index) => (
                        <li key={index}>{servico}</li>
                    ))}
                    </ul>
                </div>
            </div>
        )
    }
}


