import React, { useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { GoTrash } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa';
import { BlueButton, LightBlueButton } from '../../customMUI';
import './style.css';

const CadastrarCliente: React.FC = () => {
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [rgs, setRgs] = useState<string[]>(['']);

    const handleRgChange = (index: number, value: string) => {
        const updatedRgs = [...rgs];
        updatedRgs[index] = value;
        setRgs(updatedRgs);
    };

    const handleAddRg = () => {
        setRgs([...rgs, '']);
    };

    const handleRemoveRg = (index: number) => {
        const updatedRgs = rgs.filter((_, i) => i !== index);
        setRgs(updatedRgs);
    };

    const handleSubmit = (evento: React.FormEvent) => {
        evento.preventDefault();
        // Adicionar lógica de envio aqui
        console.log({ nome, nomeSocial, cpf, telefone, rgs });
    };

    return (
        <form className="cadastrar-cliente" onSubmit={handleSubmit}>
            <TextField
                id="nome"
                label="Nome"
                variant="outlined"
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <TextField
                id="nomeSocial"
                label="Nome Social"
                variant="outlined"
                fullWidth
                value={nomeSocial}
                onChange={(e) => setNomeSocial(e.target.value)}
            />
            <TextField
                id="cpf"
                label="CPF"
                variant="outlined"
                fullWidth
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
            />
            <TextField
                id="telefone"
                label="Telefone"
                variant="outlined"
                fullWidth
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
            />
            <div className="input-rg">
                {rgs.map((rg, index) => (
                    <div key={index} className="formControl-rg">
                        <TextField
                            value={rg}
                            label="RG"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => handleRgChange(index, e.target.value)}
                        />
                        {rgs.length > 1 && (
                            <Button
                                variant="contained"
                                startIcon={<GoTrash />}
                                color="error"
                                className="remove-action"
                                onClick={() => handleRemoveRg(index)}
                            />
                        )}
                    </div>
                ))}
                <LightBlueButton
                    startIcon={<FaPlus />}
                    type="button"
                    className="input-action add-action"
                    onClick={handleAddRg}
                />
            </div>
            <BlueButton type="submit">Cadastrar</BlueButton>
        </form>
    );
};

export default CadastrarCliente;
