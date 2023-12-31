import express from "express";
import {AddFaculty, GetAllRegisteredFaculty} from "../Controller/RegisterationController.js";

const RegisterationRoutes = express.Router();

RegisterationRoutes.route('/').post(AddFaculty).get(GetAllRegisteredFaculty);

export default RegisterationRoutes;