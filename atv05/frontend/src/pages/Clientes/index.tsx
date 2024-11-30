import React, { useState, MouseEventHandler, useEffect } from 'react';
import { DataGrid, GridRowId, GridColDef, GridActionsCellItem, GridSlots, GridToolbarContainer } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { GoTrash } from "react-icons/go";
import { FaPlus } from 'react-icons/fa';
import { CardPaper, LightBlueButton } from '../../components/customMUI';
import { AiOutlineEye } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Modal from '@mui/material/Modal';
import ClienteDetails from '../../components/ExpandRow/Cliente';
import CadastrarCliente from '../../components/Forms/Cliente/CadastrarCliente';
import { IoCloseOutline } from 'react-icons/io5';
import { Cliente, Telefone, Endereco, clienteServices } from '../../services/clienteServices';
import './style.css';
import { ApiException } from '../../config/apiConfig';
import NoRows from '../../components/GridOverlays/NoRows';

// Componente Toolbar (Onde fica o botão de adicionar)
interface TableToolbarProps {
  toggleAddModal: (newOpen: boolean) => MouseEventHandler<HTMLButtonElement>;
}

const TableToolbar: React.FC<TableToolbarProps> = ({ toggleAddModal }) => (
  <GridToolbarContainer style={{ justifyContent: 'end' }}>
    <LightBlueButton startIcon={<FaPlus />} onClick={toggleAddModal(true)}>
      Adicionar
    </LightBlueButton>
  </GridToolbarContainer>
);


const Clientes: React.FC = () => {
  const [rows, setRows] = useState<Cliente[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Cliente | null>(null);

  const fetchClientes = async () => {
    const result = await clienteServices.getAllClientes()
    if (result instanceof ApiException) {
      console.log(result.message)
    } else {
      setRows(result);
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  const handleDeleteClick = async (id: GridRowId) => {
    try{
      const response = clienteServices.deleteCliente(parseInt(id.toString()))
      console.log('Cliente excluído com sucesso:', response);
      if(rows.length > 1){
        setRows((prevRows) => prevRows.filter((row) => row.Cli_id !== id));
      }else{
        setRows([])
      }
      
    }catch(error){
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const toggleAddModal = (newOpen: boolean) => () => {
    setOpenAddModal(newOpen);
  };

  const toggleDrawer = (newOpen: boolean, row?: Cliente) => () => {
    setOpenDrawer(newOpen);
    setSelectedRow(newOpen ? row || null : null);
  };

  const handleSucess = () => {
    setOpenAddModal(false)
    fetchClientes();
  };

  const columns: GridColDef[] = [
    { field: 'Cli_id', headerName: 'ID', width: 90 },
    { field: 'Cli_nome', headerName: 'Nome', width: 250, editable: true },
    { field: 'Cli_nomeSocial', headerName: 'Nome Social', width: 250, editable: true },
    { field: 'Cli_email', headerName: 'Email', width: 250, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        if (rows.length === 0) {return []}
        else{const row = rows.find((row) => row.Cli_id === id);
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
            onClick={toggleDrawer(true, row)}
            color="inherit"
          />,
        ];
        }
      },
    },
  ];

  return (
    <main className="tabela">
      <h1 className="page-title">Clientes</h1>

      <CardPaper className="cardp-table">
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.Cli_id}
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
          slots={{ toolbar: TableToolbar as GridSlots['toolbar'], noRowsOverlay: NoRows, }}
          slotProps={{ toolbar: { toggleAddModal } }}
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
          {selectedRow ? <ClienteDetails clientInformation={selectedRow} /> : <p>Carregando...</p>}
        </Box>
      </Drawer>

      <Modal
        open={openAddModal}
        onClose={toggleAddModal(false)}
        aria-labelledby="modal-add-cliente"
        aria-describedby="modal-add-cliente"
      >
        <Box className="box-modal">
          <div className='modal-cadastro-cliente'>
            <div className="modal-title">
              <h2>Cadastrar Cliente</h2>
              <IoCloseOutline size={28} className="close-btn" onClick={toggleAddModal(false)} />
            </div>
            <CadastrarCliente onSuccess={() => handleSucess() }/>
          </div>
        </Box>
      </Modal>
    </main>
  );
};

export default Clientes;
