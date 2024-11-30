import { Component, MouseEventHandler } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowId, GridSlots, GridToolbarContainer } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { GoTrash } from "react-icons/go";
import { FaPlus } from 'react-icons/fa';
import { CardPaper, LightBlueButton } from '../../components/customMUI';
import { AiOutlineEye } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { ClienteDetails } from '../../components/ExpandRow/Cliente';
import Modal from '@mui/material/Modal';

import './style.css'
import { CadastrarCliente } from '../../components/Forms/Cliente/CadastrarCliente';
import { IoCloseOutline } from 'react-icons/io5';
import { VendaDetails } from '../../components/ExpandRow/Venda';
import { withRouter } from '../../routes/withRouter';

// Funções do toolbar tabela - Parte de cima (header) onde fica as ações
interface TableToolbarProps {
    toNovaVenda: () => void;
}

// Componente Toolbar (Onde fica o botão de adicionar)
function TableToolbar(props: TableToolbarProps) {
    const { toNovaVenda } = props;

    return (
        <GridToolbarContainer style={{justifyContent: 'end'}}>
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

type State = {
    rows: Venda[];
    expandedRowIds: GridRowId[];
    openDrawer: boolean;
    selectedRow: null | Venda;
}

type props = {
    navigate: (path: string) => void;
};

class Vendas extends Component<props, State> {
    constructor(props: props) {
        super(props);
        this.state = {
            rows: initialRows,
            expandedRowIds: [],
            openDrawer: false,
            selectedRow: null
        };
    };

    handleDeleteClick = (id: GridRowId) => () => {
        this.setState({ rows: this.state.rows.filter((row) => row.id !== id) });
    };

    toNovaVenda = () => {
        this.props.navigate('/NovaVenda');
    };

    toggleDrawer = (newOpen: boolean, row?: any) => () => {
        this.setState({openDrawer: newOpen, selectedRow: newOpen ? row : null})
    };

    getActions = ({ id }) => {
        
        const row = this.state.rows.find((row) => row.id === id);

        return [
            <GridActionsCellItem
                icon={<GoTrash size={20} />}
                sx={{ color: '#C81B1B' }}
                label="Delete"
                onClick={this.handleDeleteClick(id)}
                color="inherit"
            />,
            <GridActionsCellItem
                icon={<AiOutlineEye size={20}/>}
                sx={{ color: '#2D3748' }}
                label="Visualizar"
                onClick={() => this.toggleDrawer(true, row)()}
                color="inherit"
            />
        ];
    };

    // Definindo as colunas dentro da classe
    columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'cliente', headerName: 'Cliente', width: 250, editable: true },
        { 
            field: 'data', 
            headerName: 'Data', 
            width: 250, 
            renderCell: (params) => {
                return `${new Date(params.value).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}`
            },  
        },
        { 
            field: 'valorTotal', 
            headerName: 'Valor Total', 
            width: 250, 
            renderCell: (params) => {
                return `R$ ${Number(params.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            }, 
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            width: 100,
            cellClassName: 'actions', 
            getActions: this.getActions, 
            resizable: false
        },
    ];

    setRows = (newRows: (oldRows: Venda[]) => Venda []) => {
        this.setState((prevState) => ({
            rows: newRows(prevState.rows),
        }));
    };

    render() {
        return (
            <main className='tabela'>
                <h1 className='page-title'>Vendas</h1>

                <CardPaper className='cardp-table'>
                    <DataGrid
                        rows={this.state.rows}
                        columns={this.columns}
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
                        slotProps={{ toolbar: { toNovaVenda: this.toNovaVenda} }}
                    />
                </CardPaper>

                <Drawer
                    anchor="right"
                    open={this.state.openDrawer}
                    onClose={this.toggleDrawer(false)}
                    ModalProps={{
                        keepMounted: true, // Melhora a performance em dispositivos móveis
                    }}
                    >
                    <Box sx={{ width: 300, padding: 2 }}>
                        {this.state.selectedRow ? (
                        <>
                            <VendaDetails vendaInformations={this.state.selectedRow} />
                        </>
                        ) : (
                        <p>Carregando...</p>
                        )}
                    </Box>
                </Drawer>
            </main>
        );
    }
} 

export default withRouter(Vendas);