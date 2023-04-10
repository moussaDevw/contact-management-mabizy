import { Document } from "mongoose";

export interface IContact extends Document {
    _id?: number;
    firstName:string;
    lastName:string;
    email:string;
    number:number;
}