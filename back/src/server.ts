import express from 'express';
// import cookieParser from "cookie-parser";
import cors from 'cors';
import { createServer } from "http";

import dotenv from "dotenv";

import  fileRouter from './routes/fileRoutes';
import { connectDB } from "./config/db";
dotenv.config();

connectDB();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT;
app.use(express.json());
// app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use('/', fileRouter);

httpServer.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
