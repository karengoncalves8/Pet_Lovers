import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { GoTrash } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa';
import { BlueButton, LightBlueButton } from '../../customMUI';
import './style.css';
import { clienteServices } from '../../../services/clienteServices';
import { ApiException } from '../../../config/apiConfig';
import { MaskedTextField } from '../../FormatedInputs/maskedTextField';

interface CadastrarClienteProps {
    onSuccess: () => void;
  }
  
const CadastrarCliente: React.FC<CadastrarClienteProps> = ({ onSuccess }) => {
    const [Cli_nome, setNome] = useState('');
    const [Cli_nomeSocial, setNomeSocial] = useState('');
    const [Cli_email, setEmail] = useState('');
    const [Cli_cpf, setCpf] = useState('');
    const [Telefones, setTelefones] = useState([{ Tel_ddd: '', Tel_numero: '' }]);
    const [Rgs, setRgs] = useState(['']);
    const [Endereco, setEndereco] = useState({
        End_estado: '',
        End_cidade: '',
        End_bairro: '',
        End_rua: '',
        End_numero: '',
        End_codPostal: '',
        End_infoAdicionais: '',
    });

    // Gerenciar telefones
    const handleTelefoneChange = (index: number, field: string, value: string) => {
        setTelefones((prevTelefones) =>
            prevTelefones.map((telefone, i) =>
                i === index ? { ...telefone, [field]: value } : telefone
            )
        );
    };

    const handleAddTelefone = () => {
        setTelefones([...Telefones, { Tel_ddd: '', Tel_numero: '' }]);
    };

    const handleRemoveTelefone = (index: number) => {
        setTelefones(Telefones.filter((_, i) => i !== index));
    };

    // Gerenciar Rg
    const handleRgChange = (index: number, value: string) => {
        setRgs((prevRgs) =>
            prevRgs.map((rg, i) => (i === index ? value : rg))
        );
    };

    const handleAddRg = () => {
        setRgs([...Rgs, '']);
    };

    const handleRemoveRg = (index: number) => {
        setRgs(Rgs.filter((_, i) => i !== index));
    };

    // Gerenciar endereço
    const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEndereco((prevEndereco) => ({
            ...prevEndereco,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (evento: React.FormEvent) => {
        evento.preventDefault();
        
        const clienteAtualizado = {
            Cli_nome,
            Cli_nomeSocial,
            Cli_email,
            Cli_cpf,
            Endereco,
            Telefones,
            Rgs
        };

        try {
            const response = await clienteServices.createCliente(clienteAtualizado);
            if (response instanceof ApiException) {
                console.error(response.message);
            } else {
                console.log('Cliente criado com sucesso:', response);
                onSuccess();
            }
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
        }
    };

    return (
        <form className="cadastrar-cliente" onSubmit={handleSubmit}>
            <div className="personal-section">
            <TextField
                id="nome"
                label="Nome"
                variant="outlined"
                fullWidth
                value={Cli_nome}
                onChange={(e) => setNome(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                id="nomeSocial"
                label="Nome Social"
                variant="outlined"
                fullWidth
                value={Cli_nomeSocial}
                onChange={(e) => setNomeSocial(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                id="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={Cli_email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
            />
            <MaskedTextField
                mask="999.999.999-99"
                value={Cli_cpf}
                onChange={(e) => setCpf(e.target.value)}
                label="CPF"
                name="cpf"
                required={true}
            />
            </div>

            <div className="telefones-section">
                <h3>Telefones</h3>
                {Telefones.map((telefone, index) => (
                    <div key={index} className="formControl-telefone">
                        <TextField
                            id={`telefone-ddd-${index}`}
                            label="DDD"
                            type="number"
                            variant="outlined"
                            value={telefone.Tel_ddd}
                            onChange={(e) => handleTelefoneChange(index, 'Tel_ddd', e.target.value)}
                            margin="normal"
                            style={{ width: '20%' }}
                            required
                        />
                        <TextField
                            id={`telefone-numero-${index}`}
                            label="Número"
                            type="number"
                            variant="outlined"
                            value={telefone.Tel_numero}
                            onChange={(e) => handleTelefoneChange(index, 'Tel_numero', e.target.value)}
                            margin="normal"
                            style={{ width: '70%' }}
                            required
                        />
                        {Telefones.length > 1 && (
                            <Button
                                variant="contained"
                                startIcon={<GoTrash />}
                                color="error"
                                className="remove-action"
                                onClick={() => handleRemoveTelefone(index)}
                                style={{ height: '56px', marginLeft: '8px' }}
                            />
                        )}
                    </div>
                ))}
                <LightBlueButton
                    startIcon={<FaPlus />}
                    type="button"
                    className="add-telefone"
                    onClick={handleAddTelefone}
                >
                    Adicionar Telefone
                </LightBlueButton>
            </div>


            <div className="rgs-section">
                <h3>RGs</h3>
                {Rgs.map((rg, index) => (
                    <div key={index} className="formControl-rg">
                        <MaskedTextField
                            mask="99.999.999-9"
                            value={rg}
                            onChange={(e) => handleRgChange(index, e.target.value)}
                            label="RG"
                            name="rg"
                            required={true}
                        />
                        {Rgs.length > 1 && (
                            <Button
                                variant="contained"
                                startIcon={<GoTrash />}
                                color="error"
                                className="remove-action"
                                onClick={() => handleRemoveRg(index)}
                                style={{ height: '56px', marginLeft: '8px' }}
                            />
                        )}
                    </div>
                ))}
                <LightBlueButton
                    startIcon={<FaPlus />}
                    type="button"
                    className="add-rg"
                    onClick={handleAddRg} 
                >
                    Adicionar RG
                </LightBlueButton>
            </div>


            <div className="endereco-section">
                <h3>Endereço</h3>
                <TextField
                    id="estado"
                    label="Estado"
                    variant="outlined"
                    fullWidth
                    name="End_estado"
                    value={Endereco.End_estado}
                    onChange={handleEnderecoChange}
                    margin="normal"
                    required
                />
                <TextField
                    id="cidade"
                    label="Cidade"
                    variant="outlined"
                    fullWidth
                    name="End_cidade"
                    value={Endereco.End_cidade}
                    onChange={handleEnderecoChange}
                    margin="normal"
                    required
                />
                <TextField
                    id="bairro"
                    label="Bairro"
                    variant="outlined"
                    fullWidth
                    name="End_bairro"
                    value={Endereco.End_bairro}
                    onChange={handleEnderecoChange}
                    margin="normal"
                    required
                />
                <TextField
                    id="rua"
                    label="Rua"
                    variant="outlined"
                    fullWidth
                    name="End_rua"
                    value={Endereco.End_rua}
                    onChange={handleEnderecoChange}
                    margin="normal"
                    required
                />
                <TextField
                    id="numero"
                    label="Número"
                    type="number"
                    variant="outlined"
                    fullWidth
                    name="End_numero"
                    value={Endereco.End_numero}
                    onChange={handleEnderecoChange}
                    margin="normal"
                    required
                />
                <MaskedTextField
                    mask="99999-999"
                    value={Endereco.End_codPostal}
                    onChange={handleEnderecoChange}
                    label="Código Postal"
                    name="End_codPostal"
                    required={true}
                />
                <TextField
                    id="informacoesAdicionais"
                    label="Informações Adicionais"
                    variant="outlined"
                    fullWidth
                    name="End_infoAdicionais"
                    value={Endereco.End_infoAdicionais}
                    onChange={handleEnderecoChange}
                    margin="normal"
                />
            </div>

            <BlueButton type="submit">Cadastrar</BlueButton>
        </form>
    );
};

export default CadastrarCliente;
