import express from "express";
import {AddFaculty} from "../Controller/RegsiterationController.js";

const RegisterationRoutes = express.Router();

RegisterationRoutes.route('/').post(AddFaculty)

export default RegisterationRoutes;