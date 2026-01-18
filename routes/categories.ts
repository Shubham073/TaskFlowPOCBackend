import express from 'express';
import { addCategory, getCategories, deleteCategory } from '../controllers/categoryController';
import { authenticateJWT } from '../middleware/authMiddleware';
import { authorizeRole } from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/', authenticateJWT, authorizeRole(['admin']), addCategory);
router.get('/', authenticateJWT, getCategories);
router.delete('/:id', authenticateJWT, authorizeRole(['admin']), deleteCategory);

export default router;
