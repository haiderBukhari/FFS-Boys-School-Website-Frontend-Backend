import express from "express";
import {FacultyAuthVerification} from "../Controller/AuthChecker.js";

const FacultyModel = express.Router();

FacultyModel.route('/').get(FacultyAuthVerification);
export default FacultyModel;