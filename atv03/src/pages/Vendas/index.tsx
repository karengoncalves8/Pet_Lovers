import { useState } from 'react';
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

export interface Venda {
    id?: number;
    cliente?: string;
    pets?: Array<string>;
    valorTotal?: number;
    data?: Date;
    produtosConsumidos?: Array<string>;
    servicosConsumidos?: Array<string>;
    isNew?: boolean;
}

const initialRows: Venda[] = [
    {
        id: 1,
        cliente: 'Ana Clara Silva',
        pets: ['Felix', 'Connor'],
        valorTotal: 199.45,
        data: new Date('2024-11-01'),
        produtosConsumidos: ['Ração Golden', 'Brinquedo Ossinho'],
        servicosConsumidos: ['Banho e Tosa']
    },
    {
        id: 2,
        cliente: 'Carlos Eduardo Santos',
        pets: ['Nescau', 'Luthor'],
        valorTotal: 240.90,
        data: new Date('2024-11-02'),
        produtosConsumidos: ['Areia Sanitária', 'Shampoo Neutro'],
        servicosConsumidos: ['Consulta Veterinária', 'Vacinação']
    },
    {
        id: 3,
        cliente: 'Mariana Oliveira',
        pets: ['Caramelo'],
        valorTotal: 329.89,
        data: new Date('2024-11-03'),
        produtosConsumidos: ['Coleira Antipulgas', 'Caminha Pet'],
        servicosConsumidos: ['Banho e Tosa', 'Hidratação']
    },
    {
        id: 4,
        cliente: 'Felipe Costa',
        pets: ['Banguela', 'Lulu'],
        valorTotal: 180.50,
        data: new Date('2024-11-04'),
        produtosConsumidos: ['Comedouro Automático'],
        servicosConsumidos: ['Adestramento Básico']
    },
    {
        id: 5,
        cliente: 'Beatriz Almeida',
        pets: ['Lisa', 'Rosé'],
        valorTotal: 310.90,
        data: new Date('2024-11-05'),
        produtosConsumidos: ['Areia Sanitária', 'Shampoo Neutro'],
        servicosConsumidos: ['Hotel para Pets', 'Vacinação']
    },
    {
        id: 6,
        cliente: 'Gabriel Ferreira',
        pets: ['King', 'Bonevier', 'Galadriel'],
        valorTotal: 275.90,
        data: new Date('2024-11-06'),
        produtosConsumidos: ['Caminha Pet', 'Ração Golden'],
        servicosConsumidos: ['Banho e Tosa', 'Hidratação']
    },
    {
        id: 7,
        cliente: 'Larissa Rocha',
        pets: ['Nuna'],
        valorTotal: 210.00,
        data: new Date('2024-11-07'),
        produtosConsumidos: ['Areia Sanitária', 'Brinquedo Ossinho'],
        servicosConsumidos: ['Consulta Veterinária', 'Transporte Pet']
    },
];

const Vendas: React.FC = () => {
    const [rows, setRows] = useState<Venda[]>(initialRows);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<Venda | null>(null);
    const navigate = useNavigate();

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const toNovaVenda = () => {
        navigate('/NovaVenda');
    };

    const toggleDrawer = (newOpen: boolean, row?: Venda) => () => {
        setOpenDrawer(newOpen);
        setSelectedRow(newOpen ? row : null);
    };


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'cliente', headerName: 'Cliente', width: 250, editable: true },
        {
            field: 'data',
            headerName: 'Data',
            width: 250,
            renderCell: (params) => {
                return `${new Date(params.value).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`;
            },
        },
        {
            field: 'valorTotal',
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
                const row = rows.find((row) => row.id === id);
                return [
                    <GridActionsCellItem
                        icon={<GoTrash size={20} />}
                        sx={{ color: '#C81B1B' }}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
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
