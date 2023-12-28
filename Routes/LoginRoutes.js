import express from "express";
import {LoginFaculty} from "../Controller/RegsiterationController.js";

const LoginRoutes = express.Router();

LoginRoutes.route('/').post(LoginFaculty)

export default LoginRoutes;