import express, { Express, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import routes from './routes';
import { requestLogger, stitchErrorLogger } from './middleware';

const app: Express = express();
const port = process.env.PORT || 3000;
const allowedOrigins = (process.env.NEXTJS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(requestLogger);

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use(stitchErrorLogger);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
