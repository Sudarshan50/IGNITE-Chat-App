import e from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import cors from 'cors';
import { app,server } from './socket/socket.js';

// const app = e();
app.use(e.json());
app.use(e.urlencoded({extended:true}));
app.use(cookieParser());
dotenv.config();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));
const port = process.env.PORT;
connectDB();



///routes....
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});