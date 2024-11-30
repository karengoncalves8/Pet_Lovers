import { Router } from 'express';
import { controllerCliente } from '../controllers/clienteController';

const router = Router();

// Rota para criar um novo cliente
router.post('/', controllerCliente.createCliente);

// Rota para exibir todos os clientes
router.get('/', controllerCliente.getAllClientes);

// Rota para exibir cliente específico 
router.get('/:id', controllerCliente.getClienteById);

// Rota para editar cliente
router.put('/:id', controllerCliente.updateCliente);

// Rota para editar excluir
router.delete('/:id', controllerCliente.deleteCliente);

export default router;
