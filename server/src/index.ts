import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/error-middleware';

dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router';

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || '';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
