import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes.js';

dotenv.config();

const app=express(); // Initialize express
const port=process.env.PORT || 3001; // Port number  
const databaseURL=process.env.DATABASE_URL; // MongoDB URL

app.use(cors({ 
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'DELETE', 'PATCH','PUT'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes);
 

const server = app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})
mongoose
    .connect(databaseURL)
    .then(() => {
    console.log('DB is connected')})
    .catch(e=>{
        console.log(e.message+"Database is not connected");
})
app.get('/', (req, res) => {
    res.send('Hello World'); 
}) 


 
