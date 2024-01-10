import express from "express";
import {
	AddFaculty,
	GetAllRegisteredFaculty,
	GetFacultyById,
	UpdateFaculty, updateFacultyAssignedClasses
} from "../Controller/RegisterationController.js";

const RegisterationRoutes = express.Router();

RegisterationRoutes.route('/').post(AddFaculty).get(GetAllRegisteredFaculty).patch(UpdateFaculty);
RegisterationRoutes.route('/:id').get(GetFacultyById).patch(updateFacultyAssignedClasses);

export default RegisterationRoutes;