import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { mongoDb } from './config/db_config.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import errorHandler from './middleware/errorMiddleware.js';
import hotelRouter from './routes/hotelRoute.js';
import userRouter from './routes/usersRoute.js';
import roomRouter from './routes/roomRoute.js';


//initialize application
const app = express();
dotenv.config();
const PORT= process.env.PORT || 9000;

//connect database
mongoDb();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.get('/home', (req, res)=> {
    res.send("Welcome to JAY SUITE!");
});
app.use('/api/hotels', hotelRouter);
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);

//error Handler
app.use(errorHandler);

//start server
mongoose.connection.on('connected', ()=> {
    console.log("mongoDB connected");
});

mongoose.connection.once( "open", ()=> {
    console.log('Starting Server');

    app.listen(PORT, ()=> {
        console.log(`Server listening on port ${PORT}`);
    });
});
