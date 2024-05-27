import express from "express"
import {getAllFacultyByClassandSubject} from "../Controller/RegisterationController.js";

const FacultyRoutes = express.Router();

FacultyRoutes.route('/').get(getAllFacultyByClassandSubject);


export default FacultyRoutes;