import React, { useState } from 'react';
import { DataGrid, GridRowModesModel, GridRowModes, GridColDef, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons, GridSlots, GridToolbarContainer, GridCellParams } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { HiOutlinePencil } from 'react-icons/hi2';
import { GoTrash } from "react-icons/go";
import { FaPlus, FaRegSave } from 'react-icons/fa';
import { IoCloseOutline } from "react-icons/io5";
import { CardPaper, LightBlueButton } from '../../components/customMUI';

// Funções do toolbar tabela - Parte de cima (header) onde fica as ações
interface TableToolbarProps {
    handleClick: () => void;
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

export default function Pets() {
    const [rows, setRows] = useState<Pet[]>(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleClick = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map(row => row.id || 0)) + 1 : 1; // Garante que o novo ID seja único
        setRows((oldRows) => [
            { id: newId, nome: '', tipo: '', raca: '', genero: '', isNew: true },
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
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
        );
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // Definindo as colunas dentro do componente funcional
    const columns: GridColDef[] = [
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
            resizable: false,
            getActions: ({ id } ) => {
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
                        label="Excluir"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            }
        },
    ];

    return (
        <main className="tabela">
            <h1 className="page-title">Pets</h1>

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
}
