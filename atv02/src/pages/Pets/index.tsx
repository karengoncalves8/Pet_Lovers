import { Component } from 'react';
import { DataGrid, GridRowModesModel, GridRowModes, GridColDef, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons, GridSlots, GridToolbarContainer, GridCellParams } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { HiOutlinePencil } from 'react-icons/hi2';
import { GoTrash } from "react-icons/go";
import { FaPlus, FaRegSave } from 'react-icons/fa';
import { IoCloseOutline } from "react-icons/io5";
import { CardPaper, LightBlueButton } from '../../components/customMUI';

// Funções do toolbar tabela - Parte de cima (header) onde fica as ações
interface TableToolbarProps {
    handleClick: () => void
}

// Componente Toolbar (Onde fica o botão de adicionar)
function TableToolbar(props: TableToolbarProps) {
    const { handleClick } = props;

    return (
        <GridToolbarContainer style={{justifyContent: 'end'}}>
            <LightBlueButton startIcon={<FaPlus />} onClick={handleClick}>
                Adicionar
            </LightBlueButton>
        </GridToolbarContainer>
    );
}

interface Pet {
    id?: number;
    nome?: string;
    tipo?: string;
    raca?: string;
    genero?: string;
    isNew?: boolean; // Propriedade opcional
}

const initialRows: Pet[] = [
    { id: 1, nome: 'Loki', tipo: 'Serpente', raca: 'Piton', genero: 'Macho' },
    { id: 2, nome: 'Mia', tipo: 'Gato', raca: 'Siamês', genero: 'Fêmea' },
    { id: 3, nome: 'Thor', tipo: 'Cachorro', raca: 'Pastor Alemão', genero: 'Macho' },
    { id: 4, nome: 'Luna', tipo: 'Cachorro', raca: 'Poodle', genero: 'Fêmea' },
    { id: 5, nome: 'Nina', tipo: 'Gato', raca: 'Persa', genero: 'Fêmea' },
    { id: 6, nome: 'Max', tipo: 'Cachorro', raca: 'Beagle', genero: 'Macho' },
    { id: 7, nome: 'Bela', tipo: 'Gato', raca: 'Maine Coon', genero: 'Fêmea' },
];


type State = {
    rows: Pet[];
    rowModesModel: GridRowModesModel;
}

export default class Pets extends Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            rows: initialRows,
            rowModesModel: {}
        };
    };

    handleClick = () => {
        const newId = this.state.rows.length > 0 ? Math.max(...this.state.rows.map(row => row.id || 0)) + 1 : 1; // Garante que o novo ID seja único
        this.setRows((oldRows) => [
            { id: newId, nome: '', descricao: '', preco: 0.00, isNew: true },
            ...oldRows,
        ]);
        this.setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'nome' },
        }));
    };

    handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    handleEditClick = (id: GridRowId) => () => {
        this.setState((prevState) => ({
            rowModesModel: { ...prevState.rowModesModel, [id]: { mode: GridRowModes.Edit } }
        }));
    };

    handleSaveClick = (id: GridRowId) => () => {
        this.setState((prevState) => ({
            rowModesModel: { ...prevState.rowModesModel, [id]: { mode: GridRowModes.View } }
        }));
    };

    handleDeleteClick = (id: GridRowId) => () => {
        this.setState({ rows: this.state.rows.filter((row) => row.id !== id) });
    };

    handleCancelClick = (id: GridRowId) => () => {
        this.setState((prevState) => ({
            rowModesModel: { ...prevState.rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } }
        }));

        const editedRow = this.state.rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            this.setState({ rows: this.state.rows.filter((row) => row.id !== id) });
        }
    };

    processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        this.setState({ rows: this.state.rows.map((row) => (row.id === newRow.id ? updatedRow : row)) });
        return updatedRow;
    };

    handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        this.setState({ rowModesModel: newRowModesModel });
    };

    getActions = ({ id }) => {
        const isInEditMode = this.state.rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
            return [
                <GridActionsCellItem
                    icon={<FaRegSave size={20}/>}
                    label="Salvar"
                    sx={{ color: '#25C65B' }}
                    onClick={this.handleSaveClick(id)}
                />,
                <GridActionsCellItem
                    icon={<IoCloseOutline size={20}/>}
                    label="Cancelar"
                    onClick={this.handleCancelClick(id)}
                    color="inherit"
                />,
            ];
        }

        return [
            <GridActionsCellItem
                icon={<HiOutlinePencil size={20} />}
                label="Edit"
                sx={{ color: '#2578A1' }}
                onClick={this.handleEditClick(id)}
                color="inherit"
            />,
            <GridActionsCellItem
                icon={<GoTrash size={20} />}
                sx={{ color: '#C81B1B' }}
                label="Delete"
                onClick={this.handleDeleteClick(id)}
                color="inherit"
            />,
        ];
    };

    // Definindo as colunas dentro da classe
    columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nome', headerName: 'Nome', width: 250, editable: true },
        { field: 'tipo', headerName: 'Tipo', width: 250, editable: true },
        { field: 'raca', headerName: 'Raça', width: 250, editable: true },
        { field: 'genero', headerName: 'Genêro', width: 250, editable: true },
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

    setRows = (newRows: (oldRows: Pet[]) => Pet[]) => {
        this.setState((prevState) => ({
            rows: newRows(prevState.rows),
        }));
    };

    setRowModesModel = (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => {
        this.setState((prevState) => ({
            rowModesModel: newModel(prevState.rowModesModel),
        }));
    };

    render() {
        return (
            <main className='tabela'>
                <h1 className='page-title'>Pets</h1>

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
                        editMode="row"
                        rowModesModel={this.state.rowModesModel}
                        onRowModesModelChange={this.handleRowModesModelChange}
                        onRowEditStop={this.handleRowEditStop}
                        processRowUpdate={this.processRowUpdate}
                        slots={{ toolbar: TableToolbar as GridSlots['toolbar'] }}
                        slotProps={{ toolbar: { handleClick: this.handleClick} }}
                    />
                </CardPaper>
            </main>
        );
    }
} 