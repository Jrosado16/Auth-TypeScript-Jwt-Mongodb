import express, { Application } from 'express';
import morgan from 'morgan';

import authRoute from './routes/auth.route';

const app:Application = express();

//setting
app.set('port', process.env.PORT || 4000);

//middelware
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', authRoute);

export default app;