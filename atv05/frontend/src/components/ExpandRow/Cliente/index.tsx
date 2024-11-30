import React, { useEffect, useState } from 'react';
import './style.css';

import { HiOutlinePencil } from 'react-icons/hi2';
import { FaRegSave } from 'react-icons/fa';
import { Cliente, clienteServices } from '../../../services/clienteServices';
import { LightBlueButton } from '../../customMUI';
import { ApiException } from '../../../config/apiConfig';

type Props = {
    clientInformation: Cliente;
};

const ClienteDetails: React.FC<Props> = ({ clientInformation }) => {
    const [editMode, setEditMode] = useState(false);
    const [id, setID] = useState(0);
    const [Cli_nome, setNome] = useState('');
    const [Cli_nomeSocial, setNomeSocial] = useState('');
    const [Cli_email, setEmail] = useState('');
    const [Cli_cpf, setCpf] = useState('');
    const [Telefones, setTelefones] = useState([{ Tel_ddd: 0, Tel_numero: 0 }]);
    const [Rgs, setRgs] = useState<string[]>([]);
    const [Endereco, setEndereco] = useState({
        End_estado: '',
        End_cidade: '',
        End_bairro: '',
        End_rua: '',
        End_numero: 0,
        End_codPostal: '',
        End_infoAdicionais: '',
    });

    const fetchClientData = async () => {
        const data = await clienteServices.getClienteByID(clientInformation.Cli_id);
        if (data instanceof ApiException) {
            console.error(data.message);
        } else {
            setID(data.Cli_id);
            setNome(data.Cli_nome);
            setNomeSocial(data.Cli_nomeSocial);
            setEmail(data.Cli_email);
            setCpf(data.Cli_cpf);
            setEndereco({
                End_estado: data.Endereco?.End_estado || '',
                End_cidade: data.Endereco?.End_cidade || '',
                End_bairro: data.Endereco?.End_bairro || '',
                End_rua: data.Endereco?.End_rua || '',
                End_numero: data.Endereco?.End_numero || 0,
                End_codPostal: data.Endereco?.End_codPostal || '',
                End_infoAdicionais: data.Endereco?.End_infoAdicionais || '',
            });
            setTelefones(
                data.Telefones?.map((telefone) => ({
                    Tel_ddd: telefone.Tel_ddd,
                    Tel_numero: telefone.Tel_numero,
                })) || []
            );
            setRgs(data.Rgs?.map((rg) => rg.Rg_valor) || []);
        }
    };

    useEffect(() => {
        fetchClientData();
    }, [clientInformation.Cli_id]);

    const handleTelefoneChange = (index: number, field: string, value: string) => {
        setTelefones((prevTelefones) =>
            prevTelefones.map((telefone, i) =>
                i === index ? { ...telefone, [field]: value } : telefone
            )
        );
    };

    const handleRgChange = (index: number, value: string) => {
        setRgs((prevRgs) =>
            prevRgs.map((rg, i) => (i === index ? value : rg))
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
            Cli_nome,
            Cli_nomeSocial,
            Cli_email,
            Cli_cpf,
            Endereco,
            Telefones,
            Rgs,
        };

        try {
            const response = await clienteServices.updateCliente(id, clienteAtualizado);
            if (response instanceof ApiException) {
                console.error(response.message);
            } else {
                console.log('Cliente atualizado com sucesso:', response);
                setEditMode(false);
                fetchClientData();
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
                            name="Cli_nome"
                            id="nome"
                            value={Cli_nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="input-item">
                        <label htmlFor="nomeSocial">Nome Social: </label>
                        <input
                            type="text"
                            name="Cli_nomeSocial"
                            id="nomeSocial"
                            value={Cli_nomeSocial}
                            onChange={(e) => setNomeSocial(e.target.value)}
                        />
                    </div>
                    <div className="input-item">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            name="Cli_email"
                            id="email"
                            value={Cli_email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-item">
                        <label htmlFor="cpf">CPF: </label>
                        <input
                            type="text"
                            name="Cli_cpf"
                            id="cpf"
                            value={Cli_cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <span>Endereço </span>
                        <label htmlFor="estado">Estado: </label>
                        <input
                            type="text"
                            name="End_estado"
                            id="estado"
                            value={Endereco.End_estado}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="cidade">Cidade: </label>
                        <input
                            type="text"
                            name="End_cidade"
                            id="cidade"
                            value={Endereco.End_cidade}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="bairro">Bairro: </label>
                        <input
                            type="text"
                            name="End_bairro"
                            id="bairro"
                            value={Endereco.End_bairro}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="rua">Rua: </label>
                        <input
                            type="text"
                            name="End_rua"
                            id="rua"
                            value={Endereco.End_rua}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="numero">Numero: </label>
                        <input
                            type="text"
                            name="End_numero"
                            id="numero"
                            value={Endereco.End_numero}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="codigoPostal">Código Postal: </label>
                        <input
                            type="text"
                            name="End_codPostal"
                            id="codigoPostal"
                            value={Endereco.End_codPostal}
                            onChange={handleEnderecoChange}
                        />
                        <label htmlFor="infoAdd">Informações adicionais: </label>
                        <input
                            type="text"
                            name="End_infoAdicionais"
                            id="informacoesAdicionais"
                            value={Endereco.End_infoAdicionais}
                            onChange={handleEnderecoChange}
                        />
                    </div>
                    <div className="input-group">
                        <h3>Telefones</h3>
                        {Telefones.map((telefone, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={telefone.Tel_ddd}
                                    onChange={(e) => handleTelefoneChange(index, 'Tel_ddd', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={telefone.Tel_numero}
                                    onChange={(e) => handleTelefoneChange(index, 'Tel_numero', e.target.value)}
                                />         
                            </div>
                        ))}
                    </div>
                    <div className="input-group">
                        <h3>Rgs</h3>
                        {Rgs.map((rg, index) => (
                            <div key={index}>
                                <input
                                    type="text"
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
                        <strong>Nome:</strong> {Cli_nome}
                    </span>
                    <span>
                        <strong>Nome Social:</strong> {Cli_nomeSocial}
                    </span>
                    <span>
                        <strong>Email:</strong> {Cli_email}
                    </span>
                    <span>
                        <strong>Bairro:</strong> {Endereco.End_bairro}
                    </span>
                    <span>
                        <strong>Cidade:</strong> {Endereco.End_bairro}
                    </span>
                    <span>
                        <strong>Estado:</strong> {Endereco.End_estado}
                    </span>
                    <span>
                        <strong>Rua:</strong> {Endereco.End_rua}
                    </span>
                    <span>
                        <strong>Número:</strong> {Endereco.End_numero}
                    </span>
                    <span>
                        <strong>Informações Adicionais:</strong> {Endereco.End_infoAdicionais}
                    </span>
                    <span>
                        <strong>Código Postal:</strong> {Endereco.End_codPostal}
                    </span>
                    <span>
                        <strong>Telefones:</strong>
                    </span>
                    <ul>
                        {Telefones.map((telefone, index) => (
                            <li key={index}>{`(${telefone.Tel_ddd}) ${telefone.Tel_numero}`}</li>
                        ))}
                    </ul>
                    <span>
                        <strong>Rgs:</strong>
                    </span>
                    <ul>
                        {Rgs.map((rg, index) => (
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
        </div>
    );
};

export default ClienteDetails;
