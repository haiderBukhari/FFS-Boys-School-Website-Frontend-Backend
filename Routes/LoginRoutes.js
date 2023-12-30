import express from "express";
import {LoginFaculty} from "../Controller/RegisterationController.js";

const LoginRoutes = express.Router();

LoginRoutes.route('/').post(LoginFaculty)

export default LoginRoutes;