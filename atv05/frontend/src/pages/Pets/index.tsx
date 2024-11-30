import React, { useEffect, useState } from 'react';
import { DataGrid, GridRowModesModel, GridRowModes, GridColDef, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons, GridSlots, GridToolbarContainer, GridCellParams } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { HiOutlinePencil } from 'react-icons/hi2';
import { GoTrash } from "react-icons/go";
import { FaPlus, FaRegSave } from 'react-icons/fa';
import { IoCloseOutline } from "react-icons/io5";
import { CardPaper, LightBlueButton } from '../../components/customMUI';
import { Pet, petServices } from '../../services/petServices';
import { ApiException } from '../../config/apiConfig';
import { Cliente, clienteServices } from '../../services/clienteServices';

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



export default function Pets() {
    const [rows, setRows] = useState<Pet[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const fetchPets = async () => {
        const result = await petServices.getAllPets()
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          setRows(result);
        }
    }

    const fetchClientes = async () => {
        const result = await clienteServices.getAllClientes();
        if (result instanceof ApiException) {
            console.error(result.message);
        } else {
            setClientes(result);
        }
    };
    
    useEffect(() => {
        fetchPets()
        fetchClientes()
    }, [])

    const handleClick = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map((row) => row.Pet_id || 0)) + 1 : 1; // Garante que o novo ID seja único
        const newRow: Pet = {
            Pet_id: newId,
            Pet_nome: '',
            Pet_tipo: '',
            Pet_raca: '',
            Pet_genero: '',
            Cliente_id: undefined,
            isNew: true,
        };
        setRows((prevRows) => [newRow, ...prevRows]);
        setRowModesModel((prevState) => ({
            ...prevState,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'Pet_nome' },
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
        console.log('salvando', id)
        setRowModesModel((prevState) => ({
            ...prevState,
            [id]: { mode: GridRowModes.View },
        }));
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
        try {
            const response = await petServices.deletePet(parseInt(id.toString()));
            if (response instanceof ApiException) {
                console.error('Erro ao excluir pet:', response.message);
            } else {
                console.log('Pet excluído com sucesso:', response);
                if(rows.length > 1){
                    setRows((prevRows) => prevRows.filter((row) => row.Pet_id !== id));
                }else{
                    setRows([])
                }
            }
        } catch (error) {
            console.error('Erro ao excluir pet:', error);
        }
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel((prevState) => ({
            ...prevState,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        }));

        const editedRow = rows.find((row) => row.Pet_id === id);
        if (editedRow!.isNew) {
            setRows((prevRows) => prevRows.filter((row) => row.Pet_id !== id));
        }
    };

    const processRowUpdate = async (newRow: Pet): Promise<Pet> => {
        // Verifica se o registro é novo ou existente
        if (newRow.isNew) {
            // Criação de um novo pet
            try {
                const response = await petServices.createPet(newRow);
                if (response instanceof ApiException) {
                    console.error('Erro ao criar pet:', response.message);
                    throw new Error(response.message);
                } else {
                    console.log('Pet criado com sucesso:', response);
                    newRow.isNew = false
                    return newRow 
                }
            } catch (error) {
                console.error('Erro ao criar pet:', error);
                throw error;
            }
        } else {
            // Atualização de um pet existente
            try {
                const response = await petServices.updatePet(newRow.Pet_id!, newRow);
                if (response instanceof ApiException) {
                    console.error('Erro ao atualizar pet:', response.message);
                    throw new Error(response.message);
                } else {
                    console.log('Pet atualizado com sucesso:', response);
                    return newRow;
                }
            } catch (error) {
                console.error('Erro ao atualizar pet:', error);
                throw error;
            }
        }
    };
    
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // Definindo as colunas dentro do componente funcional
    const columns: GridColDef[] = [
        { field: 'Pet_id', headerName: 'ID', width: 40 },
        { field: 'Pet_nome', headerName: 'Nome', width: 250, editable: true },
        { field: 'Pet_tipo', headerName: 'Tipo', width: 200, editable: true },
        { field: 'Pet_raca', headerName: 'Raça', width: 200, editable: true },
        { field: 'Pet_genero', headerName: 'Genêro', width: 150, editable: true },
        {
            field: 'Cliente_id',
            headerName: 'Cliente',
            width: 250,
            editable: true,
            type: 'singleSelect',
            valueOptions: clientes.map((cliente) => ({
                value: cliente.Cli_id,
                label: cliente.Cli_nome,
            })),
            renderCell: (params) => {
                const cliente = clientes.find((c) => c.Cli_id === params.value);
                return cliente ? cliente.Cli_nome : '';
            },
        },
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
                    getRowId={(row) => row.Pet_id}
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
