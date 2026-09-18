import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));

app.use('/api', routes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend on :${PORT}`));
