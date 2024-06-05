import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import cron from 'node-cron'

const app: Application = express();


app.use(
  cors({
    origin: ['http://localhost:3000','https://spare-rooms-frontend.vercel.app'],
   
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    // 'http://localhost:3000',
    'https://spare-rooms-frontend.vercel.app'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Spare Room is server.."
    })
});

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app;