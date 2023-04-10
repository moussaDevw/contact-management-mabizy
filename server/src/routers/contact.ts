import express from "express";
import { addContact, deleteContact, getAllContacts, getOneContact, updateOneContact } from "../controllers/contact";

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getOneContact);
router.delete('/:id', deleteContact);
router.put('/:id', updateOneContact);
router.post('/', addContact);

export default router;