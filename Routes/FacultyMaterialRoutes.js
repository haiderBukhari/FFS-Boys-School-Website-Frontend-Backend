import express from "express";
import {GetFacultyMaterials, UploadFacultyMaterials} from "../Controller/FacultyMaterialController.js";
import {FacultyUploadVerification} from "../Middlewares/AuthVerification.js";

const FacultyModel = express.Router();

FacultyModel.route('/').post(FacultyUploadVerification, UploadFacultyMaterials).get(GetFacultyMaterials);
export default FacultyModel;