import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowId, GridSlots, GridToolbarContainer } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { GoTrash } from "react-icons/go";
import { FaPlus } from 'react-icons/fa';
import { CardPaper, LightBlueButton } from '../../components/customMUI';
import { AiOutlineEye } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import './style.css';

import VendaDetails from '../../components/ExpandRow/Venda';
import { useNavigate } from 'react-router-dom';
import { Venda, vendaServices } from '../../services/vendaServices';
import { ApiException } from '../../config/apiConfig';
import { clienteServices } from '../../services/clienteServices';

interface TableToolbarProps {
    toNovaVenda: () => void;
}

// Função Toolbar
function TableToolbar(props: TableToolbarProps) {
    const { toNovaVenda } = props;

    return (
        <GridToolbarContainer style={{ justifyContent: 'end' }}>
            <LightBlueButton startIcon={<FaPlus />} onClick={toNovaVenda}>
                Adicionar
            </LightBlueButton>
        </GridToolbarContainer>
    );
}

const Vendas: React.FC = () => {
    const [rows, setRows] = useState<Venda[]>([]);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<Venda | null>(null);
    const navigate = useNavigate();

    const fetchVendas = async () => {
        const result = await vendaServices.getAllVendas()
        if (result instanceof ApiException) {
        console.log(result.message)
        } else {
        setRows(result);
        }
    }

    useEffect(() => {
        fetchVendas()
    }, [])

    const handleDeleteClick = async (id: GridRowId) => {
        try{
        const response = vendaServices.deleteVenda(parseInt(id.toString()))
        console.log('Venda excluída com sucesso:', response);
        if(rows.length > 1){
            setRows((prevRows) => prevRows.filter((row) => row.Venda_id !== id));
        }else{
            setRows([])
        }
        
        }catch(error){
        console.error('Erro ao excluir venda:', error);
        }
    };

    const toNovaVenda = () => {
        navigate('/NovaVenda');
    };

    const toggleDrawer = (newOpen: boolean, row?: Venda) => () => {
        setOpenDrawer(newOpen);
        setSelectedRow(newOpen ? row : null);
    };


    const columns: GridColDef[] = [
        { field: 'Venda_id', headerName: 'ID', width: 90 },
        { 
            field: 'Cliente_id', 
            headerName: 'Cliente', 
            width: 250, 
            renderCell: (params) => {
            return params.row.Cliente?.Cli_nome || 'Desconhecido';
            }, 
        },
        {
            field: 'Venda_data',
            headerName: 'Data',
            width: 250,
            renderCell: (params) => {
                return `${new Date(params.value).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`;
            },
        },
        {
            field: 'Venda_total',
            headerName: 'Valor Total',
            width: 250,
            renderCell: (params) => {
                return `R$ ${Number(params.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }: { id: GridRowId }) => {
                const row = rows.find((row) => row.Venda_id === id);
                return [
                    <GridActionsCellItem
                        icon={<GoTrash size={20} />}
                        sx={{ color: '#C81B1B' }}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)} 
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<AiOutlineEye size={20} />}
                        sx={{ color: '#2D3748' }}
                        label="Visualizar"
                        onClick={() => toggleDrawer(true, row)()}
                        color="inherit"
                    />
                ];
            },
            resizable: false
        },
    ];

    return (
        <main className='tabela'>
            <h1 className='page-title'>Vendas</h1>

            <CardPaper className='cardp-table'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.Venda_id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        border: 'none',
                        width: '100%',
                        maxWidth: '100%'
                    }}
                    slots={{ toolbar: TableToolbar as GridSlots['toolbar'] }}
                    slotProps={{ toolbar: { toNovaVenda: toNovaVenda } }}
                />
            </CardPaper>

            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
                ModalProps={{
                    keepMounted: true, // Melhora a performance em dispositivos móveis
                }}
            >
                <Box sx={{ width: 300, padding: 2 }}>
                    {selectedRow ? (
                        <VendaDetails vendaInformations={selectedRow} />
                    ) : (
                        <p>Carregando...</p>
                    )}
                </Box>
            </Drawer>
        </main>
    );
};

export default Vendas;
