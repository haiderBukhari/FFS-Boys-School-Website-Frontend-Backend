import express from "express"
import { GetContact, PostContact, UpdateContact, DeleteContact } from './../Controller/ContactController.js';

const ContactRoutes = express.Router();

ContactRoutes.route('/').post(PostContact).get(GetContact).patch(UpdateContact).delete(DeleteContact)

export default ContactRoutes;