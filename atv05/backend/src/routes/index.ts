import { Router } from 'express';
import clienteRoutes from './clienteRoutes'
import petRoutes from './petRoutes'
import consumiveisRoutes from './consumiveisRoutes'
import vendaRoutes from './vendaRoutes'
import estatisticasRoutes from './estatisticasRoutes'

const router = Router();

// Rota para Cliente
router.use('/cliente', clienteRoutes)

// Rota para Pet
router.use('/pet', petRoutes)

// Rota para Consumivéis
router.use('/consumiveis', consumiveisRoutes)

// Rota para Venda
router.use('/venda', vendaRoutes)

// Rota para Estatisticas
router.use('/estatisticas', estatisticasRoutes)

export default router;