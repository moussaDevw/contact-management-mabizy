import { Request, Response, NextFunction } from "express";
import services from "../services/contact";
import { CustomerError } from "../utils/error";

export const getAllContacts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contacts = await services.getAllJournals();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const addContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, number } = req.body;
  const existingContact = await services.findByNumber(number);

  if (existingContact) {
    const err = new CustomerError({
      message: "Ce numéro existe déjà",
      statusCode: 409,
    });
    next(err);
  }

  try {
    const newContact = await services.addContact(
      firstName,
      lastName,
      email,
      number
    );
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contact = await services.findById(req.params.id);
    if (!contact) {
      const err = new CustomerError({
        message: "Contact non trouvé",
        statusCode: 404,
      });
      throw err;
    } else {
      res.json(contact);
      console.log(contact);
    }
  } catch (err) {
    next(err);
  }
};

export const updateOneContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const contactData = req.body;

  try {
    const updatedContact = await services.updateContact(id, contactData);

    if (!updatedContact) {
      const err = new CustomerError({
        message: "Contact non trouvé",
        statusCode: 404,
      });
      next(err);
    } else {
      res.json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await services.deleteById(req.params.id);
    if (!result) {
      throw new CustomerError({
        statusCode: 404,
        message: "Contact non trouvé",
      });
    } else {
      res.json({ message: "Contact supprimé avec succès" });
    }
  } catch (error) {
    next(error);
  }
};
