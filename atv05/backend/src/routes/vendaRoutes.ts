import { Router } from 'express';
import { controllerVenda } from '../controllers/vendaController';

const router = Router();

// Rota para criar um novo consumivel
router.post('/', controllerVenda.save);

// Rota para exibir todos as vendas
router.get('/', controllerVenda.getAllVendas);

// Rota para exibir cliente específico 
router.get('/:id', controllerVenda.getVendaById);

// Rota para excluir venda
router.delete('/:id', controllerVenda.deleteVenda);

export default router;
