import express from 'express';
import cors from 'cors';
import { ErrorHandler } from './middleware';
import router from './routes/router';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(ErrorHandler);

export default app;