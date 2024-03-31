import express from "express";
import {GetPrincipalResponses, WriteToPrincipal, WriteToPrincipalbyAudio} from "../Controller/PrincipalController.js";
import multer from "multer"

const upload = multer();

const PrincipalRoutes = express.Router();

PrincipalRoutes.route('/').post( WriteToPrincipal).get(GetPrincipalResponses);
PrincipalRoutes.route('/audio').post(upload.single('audio'), WriteToPrincipalbyAudio);

export default PrincipalRoutes