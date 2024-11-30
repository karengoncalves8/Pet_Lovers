import React, { useEffect, useState } from 'react';
import { DataGrid, GridRowModesModel, GridRowModes, GridColDef, GridActionsCellItem, GridEventListener, GridRowId, GridRowModel, GridRowEditStopReasons, GridSlots, GridToolbarContainer } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { HiOutlinePencil } from 'react-icons/hi2';
import { GoTrash } from "react-icons/go";
import { FaPlus, FaRegSave } from 'react-icons/fa';
import { IoCloseOutline } from "react-icons/io5";
import { CardPaper, LightBlueButton } from '../../components/customMUI';
import { Consumivel, consumivelServices } from '../../services/consumivelServices';
import { ApiException } from '../../config/apiConfig';

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

const Produtos: React.FC = () => {
    const [rows, setRows] = useState<Consumivel[]>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    // Fetch inicial para carregar os produtos
    const fetchProdutos = async () => {
        const result = await consumivelServices.getConsumiveisByType("Produto");
        if (result instanceof ApiException) {
            console.error(result.message);
        } else {
            setRows(result);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    // Adiciona uma nova linha para edição
    const handleClick = () => {
        const newId = rows.length > 0 ? Math.max(...rows.map((row) => row.Cons_id || 0)) + 1 : 1;
        const newRow: Consumivel = {
            Cons_id: newId,
            Cons_nome: '',
            Cons_descricao: '',
            Cons_valor: 0.00,
            Cons_tipo: "Produto",
            isNew: true,
        };
        setRows((prevRows) => [newRow, ...prevRows]);
        setRowModesModel((prevState) => ({
            ...prevState,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'Cons_nome' },
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

    const handleDeleteClick = (id: GridRowId) => async () => {
        try {
            const response = await consumivelServices.deleteConsumivel(parseInt(id.toString()));
            if (response instanceof ApiException) {
                console.error('Erro ao excluir consumivel:', response.message);
            } else {
                console.log('Consumivel excluído com sucesso:', response);
                if(rows.length > 1){
                    setRows((prevRows) => prevRows.filter((row) => row.Cons_id !== id));
                }else{
                    setRows([])
                }
            }
        } catch (error) {
            console.error('Erro ao excluir Consumivel:', error);
        }
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel((prevState) => ({
            ...prevState,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        }));

        const editedRow = rows.find((row) => row.Cons_id === id);
        if (editedRow!.isNew) {
            setRows((prevRows) => prevRows.filter((row) => row.Cons_id !== id));
        }
    };

    const processRowUpdate = async (newRow: Consumivel): Promise<Consumivel> => {
        try {
            if (newRow.isNew) {
                // Criação de novo produto
                const response = await consumivelServices.createConsumivel(newRow);
                if (response instanceof ApiException) {
                    console.error('Erro ao criar produto:', response.message);
                    throw new Error(response.message);
                }
                console.log('Produto criado com sucesso:', response);
                newRow.isNew = false
                return newRow 
            } else {
                // Atualização de produto existente
                const response = await consumivelServices.updateConsumivel(newRow.Cons_id!, newRow);
                if (response instanceof ApiException) {
                    console.error('Erro ao atualizar produto:', response.message);
                    throw new Error(response.message);
                }
                console.log('Produto atualizado com sucesso:', response);
                return newRow;
            }
        } catch (error) {
            console.error('Erro no processRowUpdate:', error);
            throw error;
        }
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // Definição das colunas
    const columns: GridColDef[] = [
        { field: 'Cons_id', headerName: 'ID', width: 90 },
        { field: 'Cons_nome', headerName: 'Nome', width: 250, editable: true },
        { field: 'Cons_descricao', headerName: 'Descrição', width: 350, editable: true },
        {
            field: 'Cons_valor',
            headerName: 'Preço',
            type: 'number',
            width: 110,
            editable: true,
            renderCell: (params) =>
                `R$ ${Number(params.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
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
                        label="Excluir"
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
                    getRowId={(row) => row.Cons_id!}
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
                    slotProps={{ toolbar: { handleClick: handleClick } }}
                />
            </CardPaper>
        </main>
    );
};

export default Produtos;
