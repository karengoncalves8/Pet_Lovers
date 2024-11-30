import React, { useEffect, useState } from 'react';
import './style.css';

import { HiOutlinePencil } from 'react-icons/hi2';
import { FaRegSave } from 'react-icons/fa';
import { Cliente, clienteServices, Telefone } from '../../../services/clienteServices';
import { LightBlueButton } from '../../customMUI';
import { ApiException } from '../../../config/apiConfig';

type Props = {
    clientInformation: Cliente;
};

const ClienteDetails: React.FC<Props> = ({ clientInformation }) => {
    const [editMode, setEditMode] = useState(false);
    const [id, setID] = useState(0);
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState({
        id: 0,
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        codigoPostal: '',
        informacoesAdicionais: '',
    });
    const [telefones, setTelefones] = useState([{ id: 1, ddd:'', numero: '' }]);

    const fetchClientData = async () => {
        const data = await clienteServices.getClienteByID(clientInformation.id);
        if (data instanceof ApiException) {
            console.error(data.message);
        }
        else {
            setID(data.id);
            setNome(data.nome);
            setNomeSocial(data.nomeSocial);
            setEmail(data.email);
            setEndereco(data.endereco);
            setTelefones(data.telefones);
        }
    };

    useEffect(() => {    
        fetchClientData();
    }, [clientInformation.id]);
    
    const handleTelefoneChange = (index: number, e) => {
        const { name, value } = e.target;
        setTelefones((prevTelefones) =>
            prevTelefones.map((telefone, i) =>
                i === index ? { ...telefone, [name]: value } : telefone
            )
        );
    };

    const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEndereco((prevEndereco) => ({
            ...prevEndereco,
            [name]: value,
        }));
    };

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const clienteAtualizado = {
            id,
            nome,
            nomeSocial,
            email,
            endereco,
            telefones,
        };

        try {
            const response = await clienteServices.updateCliente(clienteAtualizado);
            if (response instanceof ApiException) {
                console.error(response.message);
            } else {
                console.log('Cliente atualizado com sucesso:', response);
                setEditMode(false)
                fetchClientData()
            }
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
        }
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
                        <label htmlFor="nomeSocial">Email: </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <span>Endereço </span>
                        <label htmlFor="estado">Estado: </label>
                        <input
                            type="text"
                            name="estado"
                            id="estado"
                            value={endereco.estado}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="cidade">Cidade: </label>
                        <input
                            type="text"
                            name="cidade"
                            id="cidade"
                            value={endereco.cidade}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="bairro">Bairro: </label>
                        <input
                            type="text"
                            name="bairro"
                            id="bairro"
                            value={endereco.bairro}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="rua">Rua: </label>
                        <input
                            type="text"
                            name="rua"
                            id="rua"
                            value={endereco.rua}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="numero">Numero: </label>
                        <input
                            type="text"
                            name="numero"
                            id="numero"
                            value={endereco.numero}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="codigoPostal">Código Postal: </label>
                        <input
                            type="text"
                            name="codigoPostal"
                            id="codigoPostal"
                            value={endereco.codigoPostal}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="infoAdd">Informações adicionais: </label>
                        <input
                            type="text"
                            name="informacoesAdicionais"
                            id="informacoesAdicionais"
                            value={endereco.informacoesAdicionais}
                            onChange={handleEnderecoChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="rg">Telefone: </label>
                        {telefones.map((telefone: Telefone, index) => (
                            <div className="input-item telphone" key={index}>
                                <input
                                    type="text"
                                    name="ddd"
                                    id={`ddd`}
                                    value={telefone.ddd}
                                    onChange={(e) => handleTelefoneChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="numero"
                                    id={`numero`}
                                    value={telefone.numero}
                                    onChange={(e) => handleTelefoneChange(index, e)}
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
                        <strong>Nome:</strong> {nome}
                    </span>
                    <span>
                        <strong>Nome Social:</strong> {nomeSocial}
                    </span>
                    <span>
                        <strong>Email:</strong> {email}
                    </span>
                    <span>
                        <strong>Bairro:</strong> {endereco.bairro}
                    </span>
                    <span>
                        <strong>Cidade:</strong> {endereco.cidade}
                    </span>
                    <span>
                        <strong>Estado:</strong> {endereco.estado}
                    </span>
                    <span>
                        <strong>Rua:</strong> {endereco.rua}
                    </span>
                    <span>
                        <strong>Número:</strong> {endereco.numero}
                    </span>
                    <span>
                        <strong>Informações Adicionais:</strong> {endereco.informacoesAdicionais}
                    </span>
                    <span>
                        <strong>Código Postal:</strong> {endereco.codigoPostal}
                    </span>
                    <span>
                        <strong>Telefones:</strong>
                    </span>
                    <ul>
                        {telefones.map((telefone, index) => (
                            <li key={index}>{`(${telefone.ddd}) ${telefone.numero}`}</li>
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
        </div>
    );
};

export default ClienteDetails;
