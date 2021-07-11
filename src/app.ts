import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { todoRouter } from "./routers/todos";
import mongoose from "mongoose";
import cors from 'cors'
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}

const app = express();
app.use(cors())
app.use(json());
app.use('/todo', todoRouter);

if (process.env.DATABASE_URL !== undefined) {
    mongoose.connect(process.env.DATABASE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("Connected to MongoDB database")
    });
} else{
    console.log("No database URL is specified!")
}

app.get('/', (req: Request, res: Response) => {
    res.send("Hello");
});

app.listen(5000, () => console.log("Server is listening in port 5000"));