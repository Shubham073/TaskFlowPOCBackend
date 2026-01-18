import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  markTaskCompleted
} from '../controllers/taskController';
import { authorizeRole } from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/', authorizeRole(['admin', 'user']), createTask);
router.get('/', authorizeRole(['admin', 'user']), getTasks);
router.put('/:id', authorizeRole(['admin', 'user']), updateTask);
router.delete('/:id', authorizeRole(['admin']), deleteTask);
router.patch('/:id/complete', authorizeRole(['admin', 'user']), markTaskCompleted);

export default router;
