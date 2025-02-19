import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.routes.js';
import clickRouter from './routes/click.routes.js';
const app = express();
app.use(cors('*'));
app.use(express.json());
app.use(userRouter);
app.use(clickRouter);
async function main() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        const port=process.env.PORT || 8000;
        app.listen(port, () => console.log('Server running on port 5000'));
    }
    catch(error){
        console.error(error.message);
    }
}
main()
