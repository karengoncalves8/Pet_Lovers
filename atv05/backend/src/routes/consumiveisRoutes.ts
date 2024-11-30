import { Router } from 'express';
import { controllerConsumiveis } from '../controllers/consumiveisController';

const router = Router();

// Rota para criar um novo consumivel
router.post('/', controllerConsumiveis.save);

// Rota para exibir todos os consumiveis
router.get('/', controllerConsumiveis.getAllConsumiveis);

// Rota para exibir consumivel específico 
router.get('/:id', controllerConsumiveis.getConsumivelById);

// Rota para exibir todos os consumiveis de um certo tipo - Produto ou Serviço
router.get('/tipo/:tipo', controllerConsumiveis.getConsumiveisByType);

// Rota para editar consumivel
router.put('/:id', controllerConsumiveis.updateConsumivel);

// Rota para excluir pet
router.delete('/:id', controllerConsumiveis.deleteConsumivel);

export default router;
