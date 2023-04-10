import mongoose, { Document, Model, Schema } from "mongoose";
import { IContact } from "../types/contact";

const contactSchema: Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
});

contactSchema.set("toJSON", {
  transform: (_document: Document, returnedObject: IContact) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


const Contact: Model<IContact> = mongoose.model<IContact>('contact', contactSchema);

export default Contact;