import React, { useEffect, useMemo, useState } from 'react';
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
import { ApiException } from '../../config/apiConfig';
import { Cliente, clienteServices } from '../../services/clienteServices';
import { Consumivel, consumivelServices } from '../../services/consumivelServices';
import { Pet, petServices } from '../../services/petServices';
import { vendaServices } from '../../services/vendaServices';

const NovaVenda: React.FC = () => {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Consumivel[]>([]);
  const [servicos, setServicos] = useState<Consumivel[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);

  const [Cliente_id, setCliente] = useState<number>(0);
  const [Venda_total, setVendaTotal] = useState<string>('');
  const [tipoVenda, setTipoVenda] = useState<string>('');
  const [produtosSelecionados, setProdutosSelecionados] = useState<number[]>([]);
  const [servicosSelecionados, setServicosSelecionados] = useState<number[]>([]);
  const [produtosConsumidos, setProdutosConsumidos] = useState<
    { prod_id: number; quantidade: number; valor: number, pets: string[] }[]
  >([]);
  const [servicosConsumidos, setServicosConsumidos] = useState<
    {serv_id: number; quantidade: number; valor: number, pets: string[] }[]
  >([]);
  
  const combinedItens = useMemo(() => {
    return [
      ...produtosConsumidos.map((produto) => ({
        id: produto.prod_id,
        nome: produtos.find((p) => p.Cons_id === produto.prod_id)?.Cons_nome || '',
        quantidade: produto.quantidade,
        valor: produto.valor,
        pets: produto.pets,
        tipo: 'produto',
      })),
      ...servicosConsumidos.map((servico) => ({
        id: servico.serv_id,
        nome: servicos.find((s) => s.Cons_id === servico.serv_id)?.Cons_nome || '',
        quantidade: servico.quantidade,
        valor: servico.valor,
        pets: servico.pets,
        tipo: 'servico',
      })),
    ];
  }, [produtosConsumidos, servicosConsumidos, produtos, servicos]);
  
  
  const fetchClientes = async () => {
    const result = await clienteServices.getAllClientes();
    if (result instanceof ApiException) {
        console.error(result.message);
    } else {
        setClientes(result);
    }
  };

  const fetchConsumiveis = async () => {
    const result = await consumivelServices.getAllConsumiveis();
    if (result instanceof ApiException) {
        console.error(result.message);
    } else {
      const uniqueProdutos = Array.from(
        new Map(
          result
            .filter((c) => c.Cons_tipo === 'Produto')
            .map((produto) => [produto.Cons_id, produto])
        ).values()
      );
      setProdutos(uniqueProdutos);
  
      const uniqueServicos = Array.from(
        new Map(
          result
            .filter((c) => c.Cons_tipo === 'Servico')
            .map((servico) => [servico.Cons_id, servico])
        ).values()
      );
      setServicos(uniqueServicos);
    }
  };

  const fetchPets = async () => {
    const result = await petServices.getAllPets();
    if (result instanceof ApiException) {
        console.error(result.message);
    } else {
        setPets(result);
    }
  };

  useEffect(() => {
      fetchClientes()
      fetchPets()
      fetchConsumiveis()
  }, [])

  const handleSubmit = async (evento:React.MouseEvent<HTMLButtonElement>) => {
    evento.preventDefault();
    const total = calculateTotal();
    const novaVenda = {
      Venda_total: total,
      Cliente_id,
      produtosConsumidos,
      servicosConsumidos
    };

    try {
        const response = await vendaServices.createVenda(novaVenda);
        if (response instanceof ApiException) {
            console.error(response.message);
        } else {
            console.log('Venda criada com sucesso:', response);
            navigate('/Vendas');
        }
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
    }
  };

  const calculateTotal = () => {
    return combinedItens.reduce((acc, item) => acc + item.valor, 0);
  };

  const handleClienteChange = (event: SelectChangeEvent) => {
    setCliente(parseInt(event.target.value));
  };

  const handleTipoVendaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipoVenda(event.target.value);
  };

  const handleProdutoChange = (event: SelectChangeEvent<string>) => {
    const produtoSelecionado = parseInt(event.target.value);

    if (!produtosSelecionados.includes(produtoSelecionado)) {
      setProdutosSelecionados((prev) => [...prev, produtoSelecionado]);
    }
  };

  const handleServicoChange = (event: SelectChangeEvent<string>) => {
    const servicoSelecionado = parseInt(event.target.value)

    if (!servicosSelecionados.includes(servicoSelecionado)) {
      setServicosSelecionados((prev) => [...prev, servicoSelecionado]);
    }
  };

  const handleProdPetChange = (prod_id: number, event: SelectChangeEvent<string[]>) => {
    const pets = event.target.value as string[];

    setProdutosConsumidos((prev) => {
      const index = prev.findIndex((p) => p.prod_id === prod_id);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], pets };
        return updated;
      }

      return [...prev, { prod_id: prod_id, quantidade: 0, valor: 0,  pets }];
    });
  };

  const handleServPetChange = (serv_id: number, event: SelectChangeEvent<string[]>) => {
    const pets = event.target.value as string[];

    setServicosConsumidos((prev) => {
      const index = prev.findIndex((s) => s.serv_id === serv_id);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], pets };
        return updated;
      }

      return [...prev, { serv_id: serv_id, quantidade: 0, valor: 0,  pets }];
    });
  };

  const handleProdQuantidadeChange = (prod_id: number, quantidade: number) => {
    setProdutosConsumidos((prev) => {
      const index = prev.findIndex((p) => p.prod_id === prod_id);
  
      if (index !== -1) {
        const produto = produtos.find((p) => p.Cons_id === prod_id);
        const updated = [...prev];
        updated[index] = { 
          ...updated[index], 
          quantidade: Math.max(0, quantidade), 
          valor: quantidade * (produto?.Cons_valor || 0) // Atualiza o subtotal
        };
        return updated;
      }
  
      return [
        ...prev, 
        { 
          prod_id, 
          quantidade: Math.max(0, quantidade), 
          valor: quantidade * (produtos.find((p) => p.Cons_id === prod_id)?.Cons_valor || 0), 
          pets: [] 
        }
      ];
    });
  };
  

  const handleServQuantidadeChange = (serv_id: number, quantidade: number) => {
    setServicosConsumidos((prev) => {
      const index = prev.findIndex((s) => s.serv_id === serv_id);
  
      if (index !== -1) {
        const servico = servicos.find((s) => s.Cons_id === serv_id);
        const updated = [...prev];
        updated[index] = { 
          ...updated[index], 
          quantidade: Math.max(0, quantidade), 
          valor: quantidade * (servico?.Cons_valor || 0) // Atualiza o subtotal
        };
        return updated;
      }
  
      return [
        ...prev, 
        { 
          serv_id, 
          quantidade: Math.max(0, quantidade), 
          valor: quantidade * (servicos.find((s) => s.Cons_id === serv_id)?.Cons_valor || 0), 
          pets: [] 
        }
      ];
    });
  };

  const deleteSelectedProd = (prod_id: number) => {
    setProdutosSelecionados((prev) => prev.filter((item) => item !== prod_id));
    setProdutosConsumidos((prev) => prev.filter((item) => item.prod_id !== prod_id));
  };

  const deleteSelectedServ = (serv_id: number) => {
    setServicosSelecionados((prev) => prev.filter((item) => item !== serv_id));
    setServicosConsumidos((prev) => prev.filter((item) => item.serv_id !== serv_id));
  };

  const deleteItem = (id: number, tipo: string) => {
    if (tipo === 'produto') {
      setProdutosSelecionados((prev) => prev.filter((item) => item !== id));
      setProdutosConsumidos((prev) => prev.filter((item) => item.prod_id !== id));
    } else if (tipo === 'servico') {
      setServicosSelecionados((prev) => prev.filter((item) => item !== id));
      setServicosConsumidos((prev) => prev.filter((item) => item.serv_id !== id));
    }
  };

  return (
    <main className='tabela'>
        <h1 className='page-title'>Nova Venda</h1>
        
        <div className="cards-group-venda">
        <CardPaper className='cardp-venda' elevation={4}>
            <form className="venda">
                <FormControl fullWidth>
                    <InputLabel id="cliente-select-label">Cliente</InputLabel>
                    <Select
                        labelId="cliente-select-label"
                        id="cliente-select"
                        value={String(Cliente_id)}
                        label="Cliente"
                        onChange={handleClienteChange}
                    >
                      {clientes.map((cliente) => (
                        <MenuItem key={cliente.Cli_id} value={cliente.Cli_id}>
                          {cliente.Cli_nome}
                        </MenuItem>
                      ))}
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
                                    {produtos.map((produto) => (
                                      <MenuItem key={produto.Cons_id} value={produto.Cons_id}>
                                        {produto.Cons_nome}
                                      </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {produtosSelecionados.map((prod_id, index) => {
                                const item = produtosConsumidos.find((p) => p.prod_id === prod_id) || { prod_id: prod_id, quantidade: 0, valor: 0, pets: [] };
                                const produto = produtos.find((p) => p.Cons_id === prod_id)
                                return (
                                    <div className="selected-item" key={index} style={{ marginTop: '10px' }}>
                                        <div className="selected-title">
                                            <span className='item-name'>{produto.Cons_nome}</span>
                                            <GoTrash size={20} className='delete-icon' onClick={() => deleteSelectedServ(prod_id)}/>
                                        </div>
                                        <div className="input-selected-itens">
                                        <TextField
                                            label={"Quantidade"}
                                            type="number"
                                            value={item.quantidade}
                                            onChange={(event) => {
                                                const value = parseInt(event.target.value, 10);
                                                handleProdQuantidadeChange(prod_id, isNaN(value) ? 0 : value);
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
                                                onChange={(e) => handleProdPetChange(prod_id, e)}
                                            >
                                                {pets.filter((p)=> p.Cliente_id == Cliente_id).map((pet) => (
                                                <MenuItem key={pet.Pet_id} value={pet.Pet_id}>
                                                  {pet.Pet_nome}
                                                </MenuItem>
                                              ))}
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
                                {servicos.map((servico) => (
                                      <MenuItem key={servico.Cons_id} value={servico.Cons_id}>
                                        {servico.Cons_nome}
                                      </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {servicosSelecionados.map((serv_id, index) => {
                                const item = servicosConsumidos.find((s) => s.serv_id === serv_id) || { serv_id: serv_id, quantidade: 0, valor: 0, pets: [] };
                                const servico = servicos.find((s) => s.Cons_id === serv_id)
                                return (
                                    <div className="selected-item" key={index} style={{ marginTop: '10px' }}>
                                        <div className="selected-title">
                                            <span className='item-name'>{servico.Cons_nome}</span>
                                            <GoTrash size={20} className='delete-icon' onClick={() => deleteSelectedServ(serv_id)}/>
                                        </div>
                                        <div className="input-selected-itens">
                                        <TextField
                                            label={"Quantidade"}
                                            type="number"
                                            value={item.quantidade}
                                            onChange={(event) => {
                                                const value = parseInt(event.target.value, 10);
                                                handleServQuantidadeChange(serv_id, isNaN(value) ? 0 : value);
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
                                                onChange={(e) => handleServPetChange(serv_id, e)}
                                            >
                                               {pets.filter((p)=> p.Cliente_id == Cliente_id).map((pet) => (
                                                <MenuItem key={pet.Pet_id} value={pet.Pet_id}>
                                                  {pet.Pet_nome}
                                                </MenuItem>
                                              ))}
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
        {combinedItens.length > 0 ? (
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
                {combinedItens.map((item) => {
                  const petNames = item.pets.map((petId) => {
                    const pet = pets.find((p) => p.Pet_id === parseInt(petId, 10));
                    return pet.Pet_nome  
                  }).join(', ');
                  return (
                    <tr  className="receipt-values"key={item.id}>
                      <td>{item.nome}</td>
                      <td>{item.quantidade}</td>
                      <td>R$ {item.valor.toFixed(2)}</td>
                      <td>R$ {(item.quantidade * item.valor).toFixed(2)}</td>
                      <td>{petNames}</td>
                      <td>
                        <GoTrash
                          size={20}
                          className="delete-icon"
                          onClick={() => deleteItem(item.id, item.tipo)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                  <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="receipt-total" style={{textAlign:'right'}}>Total:</td>
                  <td className="receipt-total">R$ {calculateTotal().toFixed(2)}</td>
                  </tr>
              </tfoot>
            </table>
            <BlueButton className="btn-finish" onClick={(e) => handleSubmit(e)}>
              Concluir Venda
            </BlueButton>
          </div>
        ) : (
          <div className="receipt-no-itens">
            <img src={emptyCart} alt="Empty-cart" />
            <span className="no-itens">ADICIONE PRODUTOS/SERVIÇOS PARA REALIZAR A VENDA</span>
          </div>
        )}
        </CardPaper>
        </div>
    </main>
  );
};

export default NovaVenda;
