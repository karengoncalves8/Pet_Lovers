import React from 'react';
import './style.css';

import { Venda } from '../../../pages/Vendas';

type Props = {
    vendaInformations: Venda;
};

const VendaDetails: React.FC<Props> = ({ vendaInformations }) => {
    return (
        <div className="drawerCliente">
            <h2>Detalhes da Venda</h2>
            <div className="cliente-details">
                <span>
                    <strong>Cliente:</strong> {vendaInformations.cliente}
                </span>
                <span>
                    <strong>Pets:</strong>
                </span>
                <ul>
                    {vendaInformations.pets.map((pet, index) => (
                        <li key={index}>{pet}</li>
                    ))}
                </ul>
                <span>
                    <strong>Valor Total:</strong> R${' '}
                    {Number(vendaInformations.valorTotal).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                    })}
                </span>
                <span>
                    <strong>Data:</strong>{' '}
                    {new Date(vendaInformations.data).toLocaleDateString('pt-BR', {
                        timeZone: 'UTC',
                    })}
                </span>
                <span>
                    <strong>Produtos:</strong>
                </span>
                <ul>
                    {vendaInformations.produtosConsumidos.map((produto, index) => (
                        <li key={index}>{produto}</li>
                    ))}
                </ul>
                <span>
                    <strong>Serviços:</strong>
                </span>
                <ul>
                    {vendaInformations.servicosConsumidos.map((servico, index) => (
                        <li key={index}>{servico}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VendaDetails;
