import express from "express";
import {GetPrincipalResponses, WriteToPrincipal} from "../Controller/PrincipalController.js";

const PrincipalRoutes = express.Router();

PrincipalRoutes.route('/').post(WriteToPrincipal).get(GetPrincipalResponses);

export default PrincipalRoutes