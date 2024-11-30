import { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

import emptyCart from '../../assets/EmptyCart.svg'

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { BlueButton, CardPaper } from '../../components/customMUI';
import { withRouter } from '../../routes/withRouter';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { GoTrash } from 'react-icons/go';

type state = {
    cliente?: string;
    pets?: Array<string>;
    valorTotal?: number;
    data?: Date; 
    produtosConsumidos?:{ nome: string; quantidade: number; pets: Array<string> }[];
    servicosConsumidos?:{ nome: string; quantidade: number; pets: Array<string>}[];
    produtosSelecionados?: Array<string>;
    servicosSelecionados?: Array<string>;
    tipoVenda?: string; 
}

type props = {
    navigate: (path: string) => void;
};

class NovaVenda extends Component<props, state>{

    constructor(props: props) {
        super(props)

        this.state = {
            cliente: '',
            pets: [],
            valorTotal: 0,
            data: new Date(),
            produtosConsumidos: [],
            servicosConsumidos: [],
            produtosSelecionados: [],
            servicosSelecionados: [],
            tipoVenda: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClienteChange = (event: SelectChangeEvent) => {
        this.setState({cliente:(event.target.value as string)});
    };

    handleTipoVendaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ tipoVenda: event.target.value });
    };

    handleProdPetChange = (produto: string, event: SelectChangeEvent<string[]>) => {
        const pets = event.target.value as string[];
        this.setState((prevState) => {
            const produtosConsumidos = [...prevState.produtosConsumidos];
            const index = produtosConsumidos.findIndex((p) => p.nome === produto);

            if (index !== -1) {
                produtosConsumidos[index] = {
                    ...produtosConsumidos[index],
                    pets, // Atualiza apenas os pets
                };
            } else {
                produtosConsumidos.push({ nome: produto, quantidade: 0, pets });
            }

            return { produtosConsumidos };
        });
    };
    
    handleServPetChange = (servico: string, event: SelectChangeEvent<string[]>) => {
        const pets = event.target.value as string[];
        this.setState((prevState) => {
            const servicosConsumidos = [...prevState.servicosConsumidos];
            const index = servicosConsumidos.findIndex((s) => s.nome === servico);
    
            if (index !== -1) {
                servicosConsumidos[index] = {
                    ...servicosConsumidos[index],
                    pets,
                };
            } else {
                servicosConsumidos.push({ nome: servico, quantidade: 0, pets });
            }
    
            return { servicosConsumidos };
        });
    };

    handleProdutoChange = (event: SelectChangeEvent<string>) => {
        const produtoSelecionado = event.target.value;
    
        // Evita adicionar duplicados
        if (!this.state.produtosSelecionados.includes(produtoSelecionado)) {
            this.setState(
                (prevState) => ({
                    produtosSelecionados: [...prevState.produtosSelecionados, produtoSelecionado],
                }),
                () => {
                    console.log('Produtos selecionados:', this.state.produtosSelecionados);
                }
            );
        }
    };

    handleServicoChange = (event: SelectChangeEvent<string>) => {
        const servicoSelecionado = event.target.value;
    
        // Evita adicionar duplicados
        if (!this.state.servicosSelecionados.includes(servicoSelecionado)) {
            this.setState(
                (prevState) => ({
                    servicosSelecionados: [...prevState.servicosSelecionados, servicoSelecionado],
                }),
                () => {
                    console.log('Serviços selecionados:', this.state.servicosSelecionados);
                }
            );
        }
    };

    handleProdQuantidadeChange = (produto: string, quantidade: number) => {
        this.setState((prevState) => {
            const produtosConsumidos = [...prevState.produtosConsumidos];
            const index = produtosConsumidos.findIndex((p) => p.nome === produto);
    
            if (index !== -1) {
                produtosConsumidos[index] = {
                    ...produtosConsumidos[index],
                    quantidade: quantidade > 0 ? quantidade : 0, // Garante que quantidade seja >= 0
                };
            } else {
                produtosConsumidos.push({ nome: produto, quantidade, pets: [] });
            }
    
            return { produtosConsumidos };
        });
    };
    
    
    handleServQuantidadeChange = (servico: string, quantidade: number) => {
        this.setState((prevState) => {
            const servicosConsumidos = [...prevState.servicosConsumidos];
            const index = servicosConsumidos.findIndex((s) => s.nome === servico);
    
            if (index !== -1) {
                servicosConsumidos[index] = {
                    ...servicosConsumidos[index],
                    quantidade: quantidade > 0 ? quantidade : 0,
                };
            } else {
                servicosConsumidos.push({ nome: servico, quantidade, pets: [] });
            }
    
            return { servicosConsumidos };
        });
    };

    deleteSelectedServ = (servico: string) => {
        this.setState((prevState) => ({
            servicosSelecionados: prevState.servicosSelecionados.filter(
                (item) => item !== servico
            ),
            servicosConsumidos: prevState.servicosConsumidos.filter(
                (item) => item.nome !== servico
            ),
        }));
    }

    deleteSelectedProd = (produto: string) => {
        this.setState((prevState) => ({
            produtosSelecionados: prevState.produtosSelecionados.filter(
                (item) => item !== produto
            ),
            produtosConsumidos: prevState.produtosConsumidos.filter(
                (item) => item.nome !== produto
            ),
        }));
    }

    deleteItem = (nome: string) => {
        this.setState((prevState) => {
            // Verificar e remover da lista correta
            const produtosAtualizados = prevState.produtosConsumidos.filter(
                (item) => item.nome !== nome
            );
            const servicosAtualizados = prevState.servicosConsumidos.filter(
                (item) => item.nome !== nome
            );

            return {
                produtosConsumidos: produtosAtualizados,
                servicosConsumidos: servicosAtualizados,
            };
        });
    };


    public handleSubmit(evento: any) {
        evento.preventDefault()
        this.props.navigate('/Produtos');
    }

    render() {

        return (
            <main className='tabela'>
                <h1 className='page-title'>Nova Venda</h1>
                
                <div className="cards-group-venda">
                <CardPaper className='cardp-venda' elevation={4}>
                    <form className="venda" onSubmit={this.handleSubmit}>
                        <FormControl fullWidth>
                            <InputLabel id="cliente-select-label">Cliente</InputLabel>
                            <Select
                                labelId="cliente-select-label"
                                id="cliente-select"
                                value={this.state.cliente}
                                label="Cliente"
                                onChange={this.handleClienteChange}
                            >
                                <MenuItem value={10}>Ana Clara Silva</MenuItem>
                                <MenuItem value={20}>Carlos Eduardo Santos</MenuItem>
                                <MenuItem value={30}>Mariana Oliveira</MenuItem>
                            </Select>
                        </FormControl>
                        <hr className='line' />
                        <FormControl className='radio-group'>
                            <FormLabel id="tipo-group-label">Realizar venda de:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="tipo-radio-buttons-group-label"
                                name="tipo-radio-buttons-group"
                                className='radio-group-check'
                                value={this.state.tipoVenda}
                                onChange={this.handleTipoVendaChange}
                            >
                                <FormControlLabel value="servico" control={<Radio />} label="Serviço" />
                                <FormControlLabel value="produto" control={<Radio />} label="Produto" />
                            </RadioGroup>
                        </FormControl>

                        {this.state.tipoVenda === 'produto' && (
                                <div className='item-select'>
                                    <FormControl fullWidth>
                                        <InputLabel id="produtos-select-label">Produtos</InputLabel>
                                        <Select
                                            labelId="produtos-select-label"
                                            id="produtos-select"
                                            value="" 
                                            label="Produtos"
                                            onChange={this.handleProdutoChange}
                                        >
                                            <MenuItem value="" disabled>
                                                Selecione um produto
                                            </MenuItem>
                                            <MenuItem value="Ração Golden">Ração Golden</MenuItem>
                                            <MenuItem value="Coleira Antipulgas">Coleira Antipulgas</MenuItem>
                                            <MenuItem value="Areia Sanitária">Areia Sanitária</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {this.state.produtosSelecionados.map((produto, index) => {
                                        const item = this.state.produtosConsumidos.find((p) => p.nome === produto) || { nome: produto, quantidade: 0, pets: [] };
                                        return (
                                            <div className="selected-item" key={index} style={{ marginTop: '10px' }}>
                                                <div className="selected-title">
                                                    <span className='item-name'>{produto}</span>
                                                    <GoTrash size={20} className='delete-icon' onClick={() => this.deleteSelectedServ(produto)}/>
                                                </div>
                                                <div className="input-selected-itens">
                                                <TextField
                                                    label={`Quantidade`}
                                                    type="number"
                                                    value={item.quantidade}
                                                    onChange={(event) => {
                                                        const value = parseInt(event.target.value, 10);
                                                        this.handleProdQuantidadeChange(produto, isNaN(value) ? 0 : value);
                                                    }}
                                                />
                                                <FormControl fullWidth>
                                                    <InputLabel id={`pets-select-label-${index}`}>Pets</InputLabel>
                                                    <Select
                                                        labelId={`pets-select-label-${index}`}
                                                        id={`pets-select-${index}`}
                                                        multiple
                                                        value={item.pets}
                                                        renderValue={(selected) => selected.join(', ')}
                                                        label="Pets"
                                                        onChange={(e) => this.handleProdPetChange(produto, e)}
                                                    >
                                                        <MenuItem value="Loki">Loki</MenuItem>
                                                        <MenuItem value="Mia">Mia</MenuItem>
                                                        <MenuItem value="Thor">Thor</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            )}

                            {this.state.tipoVenda === 'servico' && (
                                <div className='item-select'>
                                <FormControl fullWidth>
                                    <InputLabel id="servicos-select-label">Serviços</InputLabel>
                                    <Select
                                        labelId="servicos-select-label"
                                        id="servicos-select"
                                        label="Serviços"
                                        value="" // Sempre retorna ao valor vazio
                                        onChange={this.handleServicoChange}
                                    >
                                        <MenuItem value="" disabled>
                                            Selecione um serviço
                                        </MenuItem>
                                        <MenuItem value="Banho e Tosa">Banho e Tosa</MenuItem>
                                        <MenuItem value="Consulta Veterinária">Consulta Veterinária</MenuItem>
                                        <MenuItem value="Vacinação">Vacinação</MenuItem>
                                    </Select>
                                </FormControl>
                                {this.state.servicosSelecionados.map((servico, index) => {
                                        const item = this.state.servicosConsumidos.find((s) => s.nome === servico) || { nome: servico, quantidade: 0, pets: [] };
                                        return (
                                            <div className="selected-item" key={index} style={{ marginTop: '10px' }}>
                                                <div className="selected-title">
                                                    <span className='item-name'>{servico}</span>
                                                    <GoTrash size={20} className='delete-icon' onClick={() => this.deleteSelectedServ(servico)}/>
                                                </div>
                                                <div className="input-selected-itens">
                                                <TextField
                                                    label={`Quantidade`}
                                                    type="number"
                                                    value={item.quantidade}
                                                    onChange={(event) => {
                                                        const value = parseInt(event.target.value, 10);
                                                        this.handleServQuantidadeChange(servico, isNaN(value) ? 0 : value);
                                                    }}
                                                />
                                                <FormControl fullWidth>
                                                    <InputLabel id={`pets-select-label-${index}`}>Pets</InputLabel>
                                                    <Select
                                                        labelId={`pets-select-label-${index}`}
                                                        id={`pets-select-${index}`}
                                                        multiple
                                                        value={item.pets}
                                                        renderValue={(selected) => selected.join(', ')}
                                                        label="Pets"
                                                        onChange={(e) => this.handleServPetChange(servico, e)}
                                                    >
                                                        <MenuItem value="Loki">Loki</MenuItem>
                                                        <MenuItem value="Mia">Mia</MenuItem>
                                                        <MenuItem value="Thor">Thor</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            )}
                    </form>

                </CardPaper>
                <CardPaper className='cardp-venda cardp-venda-receipt' elevation={4}>
                {this.state.produtosConsumidos.concat(this.state.servicosConsumidos).length > 0 ? (
                    <div className="receipt-with-itens">
                        <table className="receipt-table">
                            <thead>
                                <tr className="receipt-headers">
                                    <th>Nome</th>
                                    <th>Quantidade</th>
                                    <th>Custo</th>
                                    <th>Pet Destinado</th>
                                    <th>Subtotal</th>
                                    <th className="delete"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.produtosConsumidos.concat(this.state.servicosConsumidos).map((item, index) => (
                                    <tr className="receipt-values" key={index}>
                                        <td>{item.nome}</td>
                                        <td>{item.quantidade}</td>
                                        <td>R$2,00</td>
                                        <td>{item.pets.join(', ')}</td>
                                        <td>R$6,00</td>
                                        <td>
                                            <GoTrash
                                                size={20}
                                                className="delete-icon"
                                                onClick={() => this.deleteItem(item.nome)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="receipt-total" style={{textAlign:'right'}}>Total:</td>
                                <td className="receipt-total">R$30,00</td>
                                </tr>
                            </tfoot>
                        </table>
                        <BlueButton className='btn-finish'>Concluir</BlueButton>
                    </div>                
                ):(
                    <div className="receipt-no-itens">
                        <img src={emptyCart} alt="Empty-card" />
                        <span className='no-itens'>ADICIONE PRODUTOS/SERVIÇOS PARA REALIZAR A VENDA</span>
                    </div>
                )}
                </CardPaper>
                </div>
            </main>
        )
    }
}

export default withRouter(NovaVenda);
