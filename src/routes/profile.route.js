import express from 'express';
import {
  getProfile,
  updateEmail,
  deleteAccount,
  updatePassword
} from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/:id', getProfile);        // GET /profile/:id
router.put('/:id/email', updateEmail); // PUT /profile/:id/email
router.delete('/:id', deleteAccount);  // DELETE /profile/:id
router.put('/:id/password', updatePassword);

export default router;

