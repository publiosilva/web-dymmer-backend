import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.disable('x-powered-by');

app.use(routes);

app.listen(process.env.PORT || 3000);
