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
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [email, setEmail] = useState('');
    const [telefones, setTelefones] = useState([{ ddd: '', numero: '' }]);
    const [endereco, setEndereco] = useState({
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        codigoPostal: '',
        informacoesAdicionais: '',
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
        setTelefones([...telefones, { ddd: '', numero: '' }]);
    };

    const handleRemoveTelefone = (index: number) => {
        setTelefones(telefones.filter((_, i) => i !== index));
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
            nome,
            nomeSocial,
            email,
            endereco,
            telefones,
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
            console.error('Erro ao atualizar cliente:', error);
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
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                id="nomeSocial"
                label="Nome Social"
                variant="outlined"
                fullWidth
                value={nomeSocial}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
            />
            </div>

            <div className="telefones-section">
                <h3>Telefones</h3>
                {telefones.map((telefone, index) => (
                    <div key={index} className="formControl-telefone">
                        <TextField
                            id={`telefone-ddd-${index}`}
                            label="DDD" 
                            type="number"
                            variant="outlined"
                            value={telefone.ddd}
                            onChange={(e) => handleTelefoneChange(index, 'ddd', e.target.value)}
                            margin="normal"
                            style={{ width: '20%' }}
                            required
                        />
                        <TextField
                            id={`telefone-numero-${index}`}
                            label="Número"
                            type="number"
                            variant="outlined"
                            value={telefone.numero}
                            onChange={(e) => handleTelefoneChange(index, 'numero', e.target.value)}
                            margin="normal"
                            style={{ width: '70%' }}
                            required
                        />
                        {telefones.length > 1 && (
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

            <div className="endereco-section">
                <h3>Endereço</h3>
                <TextField
                    id="estado"
                    label="Estado"
                    variant="outlined"
                    fullWidth
                    name="estado"
                    value={endereco.estado}
                    onChange={handleEnderecoChange}
                    margin="normal"
                    required
                />
                <TextField
                    id="cidade"
                    label="Cidade"
                    variant="outlined"
                    fullWidth
                    name="cidade"
                    value={endereco.cidade}
                    onChange={handleEnderecoChange}
                    margin="normal"
                    required
                />
                <TextField
                    id="bairro"
                    label="Bairro"
                    variant="outlined"
                    fullWidth
                    name="bairro"
                    value={endereco.bairro}
                    onChange={handleEnderecoChange}
                    margin="normal"
                    required
                />
                <TextField
                    id="rua"
                    label="Rua"
                    variant="outlined"
                    fullWidth
                    name="rua"
                    value={endereco.rua}
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
                    name="numero"
                    value={endereco.numero}
                    onChange={handleEnderecoChange}
                    margin="normal"
                    required
                />
                <MaskedTextField
                    mask="99999-999"
                    value={endereco.codigoPostal}
                    onChange={handleEnderecoChange}
                    label="Código Postal"
                    name="codigoPostal"
                    required={true}
                />
                <TextField
                    id="informacoesAdicionais"
                    label="Informações Adicionais"
                    variant="outlined"
                    fullWidth
                    name="informacoesAdicionais"
                    value={endereco.informacoesAdicionais}
                    onChange={handleEnderecoChange}
                    margin="normal"
                />
            </div>

            <BlueButton type="submit">Cadastrar</BlueButton>
        </form>
    );
};

export default CadastrarCliente;
