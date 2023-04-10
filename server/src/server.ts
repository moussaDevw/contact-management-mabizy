import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./utils/db";
dotenv.config();
import contactRouter from "./routers/contact";
import { handleError } from "./utils/error";

const app = express();
connectDatabase();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());
app.use('/contact', contactRouter);
app.use(handleError);
app.listen(PORT, () => console.log(`connected to port ${PORT}`));