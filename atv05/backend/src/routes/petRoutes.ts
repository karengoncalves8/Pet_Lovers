import { Router } from 'express';
import { controllerPet } from '../controllers/petController';

const router = Router();

// Rota para criar um novo pet
router.post('/', controllerPet.createPet);

// Rota para exibir todos os pets
router.get('/', controllerPet.getAllPets);

// Rota para exibir pet específico 
router.get('/:id', controllerPet.getPetById);

// Rota para editar pet
router.put('/:id', controllerPet.updatePet);

// Rota para excluir pet
router.delete('/:id', controllerPet.deletePet);

export default router;
