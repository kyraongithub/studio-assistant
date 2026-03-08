import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes';
import { errorHandler } from './middleware/errorHandler';
import { env } from './config/env';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);

app.use(errorHandler);

const PORT = env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
