import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

import emptyCart from '../../assets/EmptyCart.svg';

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import { BlueButton, CardPaper } from '../../components/customMUI';
import { GoTrash } from 'react-icons/go';
import { FormLabel } from '@mui/material';

const NovaVenda: React.FC = () => {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<string>('');
  const [tipoVenda, setTipoVenda] = useState<string>('');
  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>([]);
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);
  const [produtosConsumidos, setProdutosConsumidos] = useState<
    { nome: string; quantidade: number; pets: string[] }[]
  >([]);
  const [servicosConsumidos, setServicosConsumidos] = useState<
    { nome: string; quantidade: number; pets: string[] }[]
  >([]);

  const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    navigate('/Vendas');
  };

  const handleClienteChange = (event: SelectChangeEvent) => {
    setCliente(event.target.value as string);
  };

  const handleTipoVendaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipoVenda(event.target.value);
  };

  const handleProdutoChange = (event: SelectChangeEvent<string>) => {
    const produtoSelecionado = event.target.value;

    if (!produtosSelecionados.includes(produtoSelecionado)) {
      setProdutosSelecionados((prev) => [...prev, produtoSelecionado]);
    }
  };

  const handleServicoChange = (event: SelectChangeEvent<string>) => {
    const servicoSelecionado = event.target.value;

    if (!servicosSelecionados.includes(servicoSelecionado)) {
      setServicosSelecionados((prev) => [...prev, servicoSelecionado]);
    }
  };

  const handleProdPetChange = (produto: string, event: SelectChangeEvent<string[]>) => {
    const pets = event.target.value as string[];

    setProdutosConsumidos((prev) => {
      const index = prev.findIndex((p) => p.nome === produto);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], pets };
        return updated;
      }

      return [...prev, { nome: produto, quantidade: 0, pets }];
    });
  };

  const handleServPetChange = (servico: string, event: SelectChangeEvent<string[]>) => {
    const pets = event.target.value as string[];

    setServicosConsumidos((prev) => {
      const index = prev.findIndex((s) => s.nome === servico);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], pets };
        return updated;
      }

      return [...prev, { nome: servico, quantidade: 0, pets }];
    });
  };

  const handleProdQuantidadeChange = (produto: string, quantidade: number) => {
    setProdutosConsumidos((prev) => {
      const index = prev.findIndex((p) => p.nome === produto);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantidade: Math.max(0, quantidade) };
        return updated;
      }

      return [...prev, { nome: produto, quantidade: Math.max(0, quantidade), pets: [] }];
    });
  };

  const handleServQuantidadeChange = (servico: string, quantidade: number) => {
    setServicosConsumidos((prev) => {
      const index = prev.findIndex((s) => s.nome === servico);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantidade: Math.max(0, quantidade) };
        return updated;
      }

      return [...prev, { nome: servico, quantidade: Math.max(0, quantidade), pets: [] }];
    });
  };

  const deleteSelectedProd = (produto: string) => {
    setProdutosSelecionados((prev) => prev.filter((item) => item !== produto));
    setProdutosConsumidos((prev) => prev.filter((item) => item.nome !== produto));
  };

  const deleteSelectedServ = (servico: string) => {
    setServicosSelecionados((prev) => prev.filter((item) => item !== servico));
    setServicosConsumidos((prev) => prev.filter((item) => item.nome !== servico));
  };

  const deleteItem = (nome: string) => {
    setProdutosConsumidos((prev) => prev.filter((item) => item.nome !== nome));
    setServicosConsumidos((prev) => prev.filter((item) => item.nome !== nome));
  };

  return (
    <main className='tabela'>
        <h1 className='page-title'>Nova Venda</h1>
        
        <div className="cards-group-venda">
        <CardPaper className='cardp-venda' elevation={4}>
            <form className="venda" onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <InputLabel id="cliente-select-label">Cliente</InputLabel>
                    <Select
                        labelId="cliente-select-label"
                        id="cliente-select"
                        value={cliente}
                        label="Cliente"
                        onChange={handleClienteChange}
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
                        value={tipoVenda}
                        onChange={handleTipoVendaChange}
                    >
                        <FormControlLabel value="servico" control={<Radio />} label="Serviço" />
                        <FormControlLabel value="produto" control={<Radio />} label="Produto" />
                    </RadioGroup>
                </FormControl>

                {tipoVenda === 'produto' && (
                        <div className='item-select'>
                            <FormControl fullWidth>
                                <InputLabel id="produtos-select-label">Produtos</InputLabel>
                                <Select
                                    labelId="produtos-select-label"
                                    id="produtos-select"
                                    value="" 
                                    label="Produtos"
                                    onChange={handleProdutoChange}
                                >
                                    <MenuItem value="" disabled>
                                        Selecione um produto
                                    </MenuItem>
                                    <MenuItem value="Ração Golden">Ração Golden</MenuItem>
                                    <MenuItem value="Coleira Antipulgas">Coleira Antipulgas</MenuItem>
                                    <MenuItem value="Areia Sanitária">Areia Sanitária</MenuItem>
                                </Select>
                            </FormControl>

                            {produtosSelecionados.map((produto, index) => {
                                const item = produtosConsumidos.find((p) => p.nome === produto) || { nome: produto, quantidade: 0, pets: [] };
                                return (
                                    <div className="selected-item" key={index} style={{ marginTop: '10px' }}>
                                        <div className="selected-title">
                                            <span className='item-name'>{produto}</span>
                                            <GoTrash size={20} className='delete-icon' onClick={() => deleteSelectedServ(produto)}/>
                                        </div>
                                        <div className="input-selected-itens">
                                        <TextField
                                            label={"Quantidade"}
                                            type="number"
                                            value={item.quantidade}
                                            onChange={(event) => {
                                                const value = parseInt(event.target.value, 10);
                                                handleProdQuantidadeChange(produto, isNaN(value) ? 0 : value);
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
                                                onChange={(e) => handleProdPetChange(produto, e)}
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

                    {tipoVenda === 'servico' && (
                        <div className='item-select'>
                        <FormControl fullWidth>
                            <InputLabel id="servicos-select-label">Serviços</InputLabel>
                            <Select
                                labelId="servicos-select-label"
                                id="servicos-select"
                                label="Serviços"
                                value="" // Sempre retorna ao valor vazio
                                onChange={handleServicoChange}
                            >
                                <MenuItem value="" disabled>
                                    Selecione um serviço
                                </MenuItem>
                                <MenuItem value="Banho e Tosa">Banho e Tosa</MenuItem>
                                <MenuItem value="Consulta Veterinária">Consulta Veterinária</MenuItem>
                                <MenuItem value="Vacinação">Vacinação</MenuItem>
                            </Select>
                        </FormControl>
                        {servicosSelecionados.map((servico, index) => {
                                const item = servicosConsumidos.find((s) => s.nome === servico) || { nome: servico, quantidade: 0, pets: [] };
                                return (
                                    <div className="selected-item" key={index} style={{ marginTop: '10px' }}>
                                        <div className="selected-title">
                                            <span className='item-name'>{servico}</span>
                                            <GoTrash size={20} className='delete-icon' onClick={() => deleteSelectedServ(servico)}/>
                                        </div>
                                        <div className="input-selected-itens">
                                        <TextField
                                            label={"Quantidade"}
                                            type="number"
                                            value={item.quantidade}
                                            onChange={(event) => {
                                                const value = parseInt(event.target.value, 10);
                                                handleServQuantidadeChange(servico, isNaN(value) ? 0 : value);
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
                                                onChange={(e) => handleServPetChange(servico, e)}
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
        {produtosConsumidos.concat(servicosConsumidos).length > 0 ? (
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
                        {produtosConsumidos.concat(servicosConsumidos).map((item, index) => (
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
                                        onClick={() => deleteItem(item.nome)}
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
  );
};

export default NovaVenda;
