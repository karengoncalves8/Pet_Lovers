import { Router } from 'express';
import { controllerEstatisticas } from '../controllers/estatisticasController';

const router = Router();

// Rota para criar um novo consumivel
router.get('/clienteConsumoValor', controllerEstatisticas.clientesConsumoValor);

router.get('/clienteConsumoQuantidade', controllerEstatisticas.clientesConsumoQuantidade);

router.get('/consumiveisConsumo', controllerEstatisticas.consumiveisConsumo);

router.get('/consumiveisConsumoRacaPet', controllerEstatisticas.consumiveisConsumoPorTipoRaca);

router.get('/consumiveisConsumoTipoPet', controllerEstatisticas.consumiveisConsumoPorTipoPet);

export default router;
