import { MongoError } from "mongodb";
import Contact from "../models/contact";
import { IContact } from "../types/contact";

const getAllJournals = async (): Promise<IContact[]> => {
  try {
    const journals = await Contact.find({});
    return journals;
  } catch (error) {
    throw error;
  }
};

const addContact = async (
  firstName: string,
  lastName: string,
  email: string,
  number: number
) => {
  
  const newContact = new Contact({
    firstName,
    lastName,
    email,
    number,
  });

  try {
    const contact = await newContact.save();
    return contact;
  } catch (error: unknown) {
    if (error instanceof MongoError) {
      throw new Error(`Erreur lors de l'ajout du contact: ${error.message}`);
    } else {
      throw new Error(`Erreur inattendue: ${error}`);
    }
  }
};

const findById = async (id: string): Promise<IContact | null> => {
  try {
    const contact = await Contact.findById(id).lean();
    return contact;
  } catch (error) {
    throw error;
  }
};

const findByNumber = async (number: number): Promise<IContact | null> => {
  try {
    const contact = await Contact.findOne({number}).lean();
    return contact;
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id: string): Promise<boolean> => {
  try {
    const contact = await Contact.findByIdAndDelete(id).exec();
    return !!contact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (
  id: string,
  contactData: Partial<IContact>
): Promise<IContact | null> => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, contactData, {
      new: true,
    }).lean();
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllJournals,
  addContact,
  findById,
  findByNumber,
  deleteById,
  updateContact
};
