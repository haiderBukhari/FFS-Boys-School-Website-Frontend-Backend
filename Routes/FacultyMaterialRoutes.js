import express from "express";
import {
	DeleteFacultyMaterials,
	GetFacultyMaterials,
	UploadFacultyMaterials
} from "../Controller/FacultyMaterialController.js";
import {
	FacultyDeleteMiddleware,
	FacultyUploadVerification
} from "../Middlewares/AuthVerification.js";

const FacultyMaterialRoutes = express.Router();

FacultyMaterialRoutes.route('/').post(FacultyUploadVerification, UploadFacultyMaterials).get(GetFacultyMaterials);
FacultyMaterialRoutes.route('/:facultyId/:subject/:class/:linkId').delete(FacultyDeleteMiddleware, DeleteFacultyMaterials);
export default FacultyMaterialRoutes;