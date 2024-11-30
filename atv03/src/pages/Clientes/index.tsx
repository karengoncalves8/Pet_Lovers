import React, { useState, MouseEventHandler } from 'react';
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

import './style.css';

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

export interface Cliente {
  id?: number;
  nome?: string;
  nomeSocial?: string;
  cpf?: string;
  telefone?: string;
  rg: Array<string>;
  pet: Array<string>;
  isNew?: boolean;
}

const initialRows: Cliente[] = [
  { id: 1, nome: 'Ana Clara Silva', nomeSocial: 'Ana Clara', cpf: '123.456.789-00', telefone: '(11) 98765-4321', rg: ['57.098.045-87', '34.058.041-97'], pet: ['Felix', 'Connor'] },
  { id: 2, nome: 'Carlos Eduardo Santos', nomeSocial: 'Carlos Eduardo', cpf: '987.654.321-11', telefone: '(21) 91234-5678', rg: ['17.078.085-82', '76.634.041-04'], pet: ['Nescau', 'Luthor'] },
  { id: 3, nome: 'Mariana Oliveira', nomeSocial: 'Mariana Oliveira', cpf: '456.789.123-22', telefone: '(31) 99876-5432', rg: ['84.093.741-95'], pet: ['Caramelo'] },
  { id: 4, nome: 'Felipe Costa', nomeSocial: 'Felipe Costa', cpf: '321.654.987-33', telefone: '(41) 91123-4567', rg: ['65.268.673-86'], pet: ['Banguela', 'Lulu'] },
  { id: 5, nome: 'Beatriz Almeida', nomeSocial: 'Beatriz Almeida', cpf: '789.123.456-44', telefone: '(51) 98765-1234', rg: ['53.753.543-75'], pet: ['Lisa', 'Rosé'] },
  { id: 6, nome: 'Gabriel Ferreira', nomeSocial: 'Gabriel Ferreira', cpf: '654.987.321-55', telefone: '(61) 91234-8765', rg: ['54.645.872-12'], pet: ['King', 'Bonevier', 'Galadriel'] },
  { id: 7, nome: 'Larissa Rocha', nomeSocial: 'Larissa Rocha', cpf: '987.321.654-66', telefone: '(71) 99876-4321', rg: ['23.645.76-43'], pet: ['Nuna'] },
];

const Clientes: React.FC = () => {
  const [rows, setRows] = useState<Cliente[]>(initialRows);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Cliente | null>(null);

  const handleDeleteClick = (id: GridRowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const toggleAddModal = (newOpen: boolean) => () => {
    setOpenAddModal(newOpen);
  };

  const toggleDrawer = (newOpen: boolean, row?: Cliente) => () => {
    setOpenDrawer(newOpen);
    setSelectedRow(newOpen ? row || null : null);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nome', headerName: 'Nome', width: 250, editable: true },
    { field: 'cpf', headerName: 'CPF', width: 250, editable: true },
    { field: 'telefone', headerName: 'Telefone', width: 250, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const row = rows.find((row) => row.id === id);
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
          slots={{ toolbar: TableToolbar as GridSlots['toolbar'] }}
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
          {selectedRow ? <ClienteDetails clietInformation={selectedRow} /> : <p>Carregando...</p>}
        </Box>
      </Drawer>

      <Modal
        open={openAddModal}
        onClose={toggleAddModal(false)}
        aria-labelledby="modal-add-cliente"
        aria-describedby="modal-add-cliente"
      >
        <Box className="box-modal">
          <div className="modal-cadastro-cliente">
            <div className="modal-title">
              <h2>Cadastrar Cliente</h2>
              <IoCloseOutline size={28} className="close-btn" onClick={toggleAddModal(false)} />
            </div>
            <CadastrarCliente />
          </div>
        </Box>
      </Modal>
    </main>
  );
};

export default Clientes;
