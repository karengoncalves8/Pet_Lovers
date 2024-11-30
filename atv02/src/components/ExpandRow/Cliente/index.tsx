import { Component } from 'react';

import './style.css';

import { HiOutlinePencil } from 'react-icons/hi2';
import { FaRegSave } from 'react-icons/fa';
import { LightBlueButton } from '../../customMUI';
import { Cliente } from '../../../pages/Clientes';


type state = {
    editMode: boolean
    nome:string;
    nomeSocial: string;
    cpf: string;
    telefone: string;
    rgs: Array<string>;
}

type props = {
    clietInformation: Cliente
};

export class ClienteDetails extends Component<props, state>{

    constructor(props: props) {
        super(props)

        this.state = {
            editMode: false,
            nome: '',
            nomeSocial: '',
            cpf: '',
            telefone: '',
            rgs: ['']
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleRgChange = (index: number, value: string) => {
        const updatedRgs = [...this.state.rgs];
        updatedRgs[index] = value;
        this.setState({ rgs: updatedRgs });
    };

    public handleSubmit(evento: any) {
        evento.preventDefault()
    }

    render() {

        return (
            <div className="drawerCliente">
                <h2>Detalhes do Cliente</h2>
                {this.state.editMode ? (
                    <form className="cliente-details " onSubmit={this.handleSubmit}>
                        <div className="input-item">
                            <label htmlFor="nome">Nome: </label>
                            <input type="text" name="nome" id="nome" value={this.props.clietInformation.nome} onChange={(e) => this.setState({nome: e.target.value})} />
                        </div>
                        <div className="input-item">
                            <label htmlFor="nomeSocial">Nome Social: </label>
                            <input type="text" name="nomeSocial" id="nomeSocial" value={this.props.clietInformation.nomeSocial} onChange={(e) => this.setState({nomeSocial: e.target.value})}/>
                        </div>
                        <div className="input-item">
                            <label htmlFor="nome">CPF: </label>
                            <input type="text" name="cpf" id="cpf" value={this.props.clietInformation.cpf} onChange={(e) => this.setState({cpf: e.target.value})}/>
                        </div>
                        <div className="input-item">
                            <label htmlFor="telefone">Telefone: </label>
                            <input type="text" name="telefone" id="telefone" value={this.props.clietInformation.telefone} onChange={(e) => this.setState({telefone: e.target.value})}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="rg">RGs: </label>
                            {this.props.clietInformation.rg.map((rg, index) => (
                                <div className="input-item" key={index}>
                                    <input type="text" name="rg" id={`rg-${index}`} value={rg} onChange={(e) => this.handleRgChange(index, e.target.value)}/>
                                </div>
                            ))}
                        </div>
                        <LightBlueButton startIcon={<FaRegSave />} type='submit'>SALVAR</LightBlueButton>
                    </form>
                ) : (
                    <div className='cliente-details '>
                        <span><strong>Nome:</strong>{this.props.clietInformation.nome}</span>
                        <span><strong>Nome Social:</strong>{this.props.clietInformation.nomeSocial}</span>
                        <span><strong>CPF:</strong>{this.props.clietInformation.cpf}</span>
                        <span><strong>Telefone:</strong> {this.props.clietInformation.telefone}</span>
                        <span><strong>RGs:</strong></span>
                        <ul>
                        {this.props.clietInformation.rg.map((rg, index) => (
                            <li key={index}>{rg}</li>
                        ))}
                        </ul>
                        <LightBlueButton startIcon={<HiOutlinePencil />} onClick={() => this.setState({editMode:true})}>EDITAR</LightBlueButton>
                    </div>
                )}
                <hr />
                <section className='cliente-pets'>
                    <h3>Pets</h3>
                    <ul>
                    {this.props.clietInformation.pet.map((pet, index) => (
                        <li key={index}>{pet}</li>
                    ))}
                    </ul>
                </section>
            </div>
        )
    }
}


