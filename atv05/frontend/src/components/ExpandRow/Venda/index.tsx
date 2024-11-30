import React from 'react';
import './style.css';

import { Venda } from '../../../services/vendaServices';

type Props = {
    vendaInformations: Venda;
};

const VendaDetails: React.FC<Props> = ({ vendaInformations }) => {
    return (
        <div className="drawerCliente">
            <h2>Detalhes da Venda</h2>
            <div className="cliente-details">
                <span>
                    <strong>Cliente:</strong> {vendaInformations.Cliente.Cli_nome}
                </span>
                <span>
                    <strong>Pets:</strong>
                </span>
                <ul>
                {Array.from(new Set(vendaInformations.Venda_itens.flatMap((venda) => 
                    venda.Pets.map((pet) => pet.Pet_nome)))).map((petNome, index) => (
                        <li key={index}>{petNome}</li>
                ))}
                </ul>
                <span>
                    <strong>Valor Total:</strong> R${' '}
                    {Number(vendaInformations.Venda_total).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                    })}
                </span>
                <span>
                    <strong>Data:</strong>{' '}
                    {new Date(vendaInformations.Venda_data).toLocaleDateString('pt-BR', {
                        timeZone: 'UTC',
                    })}
                </span>
                <span>
                    <strong>Produtos:</strong>
                </span>
                <ul>
                    {vendaInformations.Venda_itens.map((venda, index) => (
                        venda.Consumiveis.Cons_tipo == 'Produto' && (
                            <li key={index}>{venda.VenItens_quantidade} {venda.Consumiveis.Cons_nome} </li>
                        )
                    ))}
                </ul>
                <span>
                    <strong>Serviços:</strong>
                </span>
                <ul>
                    {vendaInformations.Venda_itens.map((venda, index) => (
                        venda.Consumiveis.Cons_tipo == 'Servico' && (
                            <li key={index}>{venda.VenItens_quantidade} {venda.Consumiveis.Cons_nome}</li>
                        )
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VendaDetails;
