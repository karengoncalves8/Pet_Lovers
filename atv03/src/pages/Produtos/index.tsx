import React, { useState } from 'react';
import { DataGrid, GridRowModesModel, GridRowModes, GridColDef, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons, GridSlots, GridToolbarContainer } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { HiOutlinePencil } from 'react-icons/hi2';
import { GoTrash } from "react-icons/go";
import { FaPlus, FaRegSave } from 'react-icons/fa';
import { IoCloseOutline } from "react-icons/io5";
import { CardPaper, LightBlueButton } from '../../components/customMUI';

interface TableToolbarProps {
    handleClick: () => void;
}

const TableToolbar: React.FC<TableToolbarProps> = ({ handleClick }) => (
    <GridToolbarContainer style={{ justifyContent: 'end' }}>
        <LightBlueButton startIcon={<FaPlus />} onClick={handleClick}>
            Adicionar
        </LightBlueButton>
    </GridToolbarContainer>
);

interface Produto {
    id?: number;
    nome?: string;
    descricao?: string;
    preco?: number;
    isNew?: boolean;
}

const initialRows: Produto[] = [
    { id: 1, nome: 'Ração Golden', descricao: 'Ração para filhotes da marca Golden', preco: 24.55 },
    { id: 2, nome: 'Coleira Antipulgas', descricao: 'Coleira antipulgas e carrapatos para cães', preco: 89.99 },
    { id: 3, nome: 'Areia Sanitária', descricao: 'Areia sanitária para gatos, 4kg', preco: 14.90 },
    { id: 4, nome: 'Brinquedo Ossinho', descricao: 'Brinquedo em formato de osso para cães', preco: 12.50 },
    { id: 5, nome: 'Caminha Pet', descricao: 'Cama confortável para cães e gatos, tamanho médio', preco: 59.99 },
    { id: 6, nome: 'Comedouro Automático', descricao: 'Comedouro automático para pets, capacidade de 2L', preco: 139.90 },
    { id: 7, nome: 'Shampoo Neutro', descricao: 'Shampoo neutro para banho de pets, 500ml', preco: 22.30 },
];

const Produtos: React.FC = () => {
    const [rows, setRows] = useState<Produto[]>(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleClick = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(row => row.id || 0)) + 1 : 1;
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
                        label="Edit"
                        sx={{ color: '#2578A1' }}
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<GoTrash size={20} />}
                        sx={{ color: '#C81B1B' }}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
            resizable: false,
        },
    ];

    return (
        <main className='tabela'>
            <h1 className='page-title'>Produtos</h1>

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
                        maxWidth: '100%',
                    }}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{ toolbar: TableToolbar as GridSlots['toolbar'] }}
                    slotProps={{ toolbar: { handleClick: handleClick } }}
                />
            </CardPaper>
        </main>
    );
};

export default Produtos;
