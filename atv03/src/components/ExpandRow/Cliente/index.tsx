import React, { useState } from 'react';
import './style.css';

import { HiOutlinePencil } from 'react-icons/hi2';
import { FaRegSave } from 'react-icons/fa';
import { LightBlueButton } from '../../customMUI';
import { Cliente } from '../../../pages/Clientes';

type Props = {
    clietInformation: Cliente;
};

const ClienteDetails: React.FC<Props> = ({ clietInformation }) => {
    const [editMode, setEditMode] = useState(false);
    const [nome, setNome] = useState(clietInformation.nome || '');
    const [nomeSocial, setNomeSocial] = useState(clietInformation.nomeSocial || '');
    const [cpf, setCpf] = useState(clietInformation.cpf || '');
    const [telefone, setTelefone] = useState(clietInformation.telefone || '');
    const [rgs, setRgs] = useState<string[]>(clietInformation.rg || []);

    const handleRgChange = (index: number, value: string) => {
        const updatedRgs = [...rgs];
        updatedRgs[index] = value;
        setRgs(updatedRgs);
    };

    const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        // Aqui você pode enviar os dados atualizados para o backend ou executar outra lógica.
        console.log({ nome, nomeSocial, cpf, telefone, rgs });
        setEditMode(false);
    };

    return (
        <div className="drawerCliente">
            <h2>Detalhes do Cliente</h2>
            {editMode ? (
                <form className="cliente-details" onSubmit={handleSubmit}>
                    <div className="input-item">
                        <label htmlFor="nome">Nome: </label>
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="input-item">
                        <label htmlFor="nomeSocial">Nome Social: </label>
                        <input
                            type="text"
                            name="nomeSocial"
                            id="nomeSocial"
                            value={nomeSocial}
                            onChange={(e) => setNomeSocial(e.target.value)}
                        />
                    </div>
                    <div className="input-item">
                        <label htmlFor="cpf">CPF: </label>
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                    <div className="input-item">
                        <label htmlFor="telefone">Telefone: </label>
                        <input
                            type="text"
                            name="telefone"
                            id="telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="rg">RGs: </label>
                        {rgs.map((rg, index) => (
                            <div className="input-item" key={index}>
                                <input
                                    type="text"
                                    name="rg"
                                    id={`rg-${index}`}
                                    value={rg}
                                    onChange={(e) => handleRgChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <LightBlueButton startIcon={<FaRegSave />} type="submit">
                        SALVAR
                    </LightBlueButton>
                </form>
            ) : (
                <div className="cliente-details">
                    <span>
                        <strong>Nome:</strong> {clietInformation.nome}
                    </span>
                    <span>
                        <strong>Nome Social:</strong> {clietInformation.nomeSocial}
                    </span>
                    <span>
                        <strong>CPF:</strong> {clietInformation.cpf}
                    </span>
                    <span>
                        <strong>Telefone:</strong> {clietInformation.telefone}
                    </span>
                    <span>
                        <strong>RGs:</strong>
                    </span>
                    <ul>
                        {clietInformation.rg.map((rg, index) => (
                            <li key={index}>{rg}</li>
                        ))}
                    </ul>
                    <LightBlueButton
                        startIcon={<HiOutlinePencil />}
                        onClick={() => setEditMode(true)}
                    >
                        EDITAR
                    </LightBlueButton>
                </div>
            )}
            <hr />
            <section className="cliente-pets">
                <h3>Pets</h3>
                <ul>
                    {clietInformation.pet.map((pet, index) => (
                        <li key={index}>{pet}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ClienteDetails;
