import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/auth';
import taskRoutes from '../routes/tasks';
import userRoutes from '../routes/users';
import { authenticateJWT } from '../middleware/authMiddleware';
import categoryRoutes from '../routes/categories';
import { logger } from '../middleware/logger';
import { corsMiddleware } from './corsConfig';

const app = express();
const PORT = process.env.PORT || 8000;


app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateJWT, taskRoutes);
app.use('/api/users', authenticateJWT, userRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.send('TaskFlow Management API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
