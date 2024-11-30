import { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

import logo from '../../assets/logo/logo.svg'

import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { HiOutlinePencil } from 'react-icons/hi2';
import { FaPlus, FaRegSave } from 'react-icons/fa';
import { BlueButton, LightBlueButton } from '../../customMUI';
import { Cliente } from '../../../pages/Clientes';
import { Button } from '@mui/material';
import { IoCloseOutline } from 'react-icons/io5';
import { GoTrash } from 'react-icons/go';


type state = {
    nome:string;
    nomeSocial: string;
    cpf: string;
    telefone: string;
    rgs: Array<string>;
}

type props = {

};

export class CadastrarCliente extends Component<props, state>{

    constructor(props: props) {
        super(props)

        this.state = {
            nome: '',
            nomeSocial: '',
            cpf: '',
            telefone: '',
            rgs: ['']
        }
    }

    handleRgChange = (index: number, value: string) => {
        const updatedRgs = [...this.state.rgs];
        updatedRgs[index] = value;
        this.setState({ rgs: updatedRgs });
    };

    // Adiciona um novo campo de RG
    handleAddRg = () => {
        this.setState((prevState) => ({
            rgs: [...prevState.rgs, ''], // Adiciona um novo campo vazio ao array
        }));
    };

    // Remove um campo de RG específico
    handleRemoveRg = (index: number) => {
        const updatedRgs = this.state.rgs.filter((_, i) => i !== index);
        this.setState({ rgs: updatedRgs });
    };

    public handleSubmit(evento: any) {
        evento.preventDefault()
    }


    render() {

        return (
            <form className="cadastrar-cliente" onSubmit={this.handleSubmit}>
                <FormControl variant="outlined" fullWidth>
                    <TextField
                        id="nome"
                        label="Nome"
                        variant="outlined"
                        value={this.state.nome} 
                        onChange={(e) => this.setState({nome: e.target.value})}
                    />
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                    <TextField
                        id="nomeSocial"
                        label="Nome Social"
                        variant="outlined"
                        value={this.state.nomeSocial}
                        onChange={(e) => this.setState({nomeSocial: e.target.value})}
                    />
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                    <TextField
                        id="cpf"
                        label="CPF"
                        variant="outlined"
                        value={this.state.cpf}
                        onChange={(e) => this.setState({cpf: e.target.value})} 
                    />
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                    <TextField
                        id="telefone"
                        label="Telefone"
                        variant="outlined"
                        value={this.state.telefone} 
                        onChange={(e) => this.setState({telefone: e.target.value})}
                    />
                </FormControl>
                <div className="input-rg">
                    {this.state.rgs.map((rg, index) => (
                    <FormControl
                        key={index}
                        fullWidth
                        className='formControl-rg'
                    >
                            <TextField
                                value={rg}
                                label='RG'
                                onChange={(e) => this.handleRgChange(index, e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                            {/* Botão para remover o campo */}
                            {this.state.rgs.length > 1 && (
                                <Button
                                    variant="contained"
                                    startIcon={<GoTrash />}
                                    color="error"
                                    className='remove-action'
                                    onClick={() => this.handleRemoveRg(index)}
                                />
                            )}
                    </FormControl>
                    ))}
                    <LightBlueButton startIcon={<FaPlus />} type='button' className='input-action add-action' onClick={this.handleAddRg}/>
                </div>
                <BlueButton type='submit'>Cadastrar</BlueButton>
            </form>
        )
    }
}


