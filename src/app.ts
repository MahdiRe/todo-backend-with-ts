import express, { Request, Response, NextFunction} from "express";
import {json} from "body-parser";
import { todoRouter } from "./routers/todos";
import mongoose from "mongoose";
import cors from 'cors'

const app = express();
app.use(cors())
app.use(json());
app.use('/todo', todoRouter);

mongoose.connect('mongodb+srv://admin:admin321@cluster0.fy6wk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to MongoDB database")
});

app.get('/', (req: Request, res: Response) => {
    res.send("Hello");
});

app.listen(5000, () => console.log("Server is listening in port 5000"));