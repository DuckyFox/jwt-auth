import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import router from './router';

const app = express()
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL || ''

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

const start = async () => {
    try {
        await  mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()