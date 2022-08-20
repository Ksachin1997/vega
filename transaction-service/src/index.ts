import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '4000');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ heartbeat: 200 });
});
dotenv.config();
app.use(router);

app.listen(PORT, () => {
  console.log(`Transaction-service started at PORT: ${PORT}`);
});
