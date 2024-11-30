import { useState } from 'react';
import { DataGrid, GridRowModesModel, GridRowModes, GridColDef, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons, GridSlots, GridToolbarContainer } from '@mui/x-data-grid';
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
        <GridToolbarContainer style={{ justifyContent: 'end' }}>
            <LightBlueButton startIcon={<FaPlus />} onClick={handleClick}>
                Adicionar
            </LightBlueButton>
        </GridToolbarContainer>
    );
}

interface Servico {
    id?: number;
    nome?: string;
    descricao?: string;
    preco?: number;
    isNew?: boolean; // Propriedade opcional
}

const initialRows: Servico[] = [
    { id: 1, nome: 'Banho e Tosa', descricao: 'Serviço de banho e tosa completo para cães e gatos', preco: 79.90 },
    { id: 2, nome: 'Consulta Veterinária', descricao: 'Atendimento com veterinário especializado', preco: 150.00 },
    { id: 3, nome: 'Vacinação', descricao: 'Aplicação de vacinas essenciais para cães e gatos', preco: 90.00 },
    { id: 4, nome: 'Hidratação', descricao: 'Hidratação especial para pelos de cães e gatos', preco: 50.00 },
    { id: 5, nome: 'Hotel para Pets', descricao: 'Hospedagem diária para cães e gatos', preco: 120.00 },
    { id: 6, nome: 'Adestramento Básico', descricao: 'Sessão de adestramento para comandos básicos', preco: 100.00 },
    { id: 7, nome: 'Transporte Pet', descricao: 'Transporte seguro para pets, ida e volta', preco: 60.00 },
];

const Servicos = () => {
    const [rows, setRows] = useState<Servico[]>(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleClick = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(row => row.id || 0)) + 1 : 1; // Garante que o novo ID seja único
        setRows((oldRows) => [
            { id: newId, nome: '', descricao: '', preco: 0.00, isNew: true },
            ...oldRows,
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'nome' },
        }));
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel((prevState) => ({
            ...prevState,
            [id]: { mode: GridRowModes.Edit },
        }));
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel((prevState) => ({
            ...prevState,
            [id]: { mode: GridRowModes.View },
        }));
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel((prevState) => ({
            ...prevState,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        }));

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // Definindo as colunas dentro da função
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nome', headerName: 'Nome', width: 250, editable: true },
        { field: 'descricao', headerName: 'Descrição', width: 350, editable: true },
        {
            field: 'preco',
            headerName: 'Preço',
            type: 'number',
            width: 110,
            editable: true,
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
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<FaRegSave size={20} />}
                            label="Salvar"
                            sx={{ color: '#25C65B' }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<IoCloseOutline size={20} />}
                            label="Cancelar"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
        
                return [
                    <GridActionsCellItem
                        icon={<HiOutlinePencil size={20} />}
                        label="Editar"
                        sx={{ color: '#2578A1' }}
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<GoTrash size={20} />}
                        sx={{ color: '#C81B1B' }}
                        label="Deletar"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
            resizable: false,
        },
    ];

    return (
        <main className="tabela">
            <h1 className="page-title">Serviços</h1>

            <CardPaper className="cardp-table">
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
                        maxWidth: '100%',
                    }}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{ toolbar: TableToolbar as GridSlots['toolbar'] }}
                    slotProps={{ toolbar: { handleClick } }}
                />
            </CardPaper>
        </main>
    );
};

export default Servicos;
