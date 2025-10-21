import express from 'express';
import {
  addFavoriteController,
  getFavoritesByUserController,
  deleteFavoriteController
} from '../controllers/favorites.controller.js';

const router = express.Router();

router.post('/', addFavoriteController);

router.get('/:userId', getFavoritesByUserController);

router.delete("/:id", deleteFavoriteController);

export default router;
