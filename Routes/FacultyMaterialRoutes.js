import express from "express";
import {config} from 'dotenv'
import {
	DeleteFacultyMaterials,
	GetFacultyMaterials,
	UploadFacultyMaterials
} from "../Controller/FacultyMaterialController.js";
import {
	FacultyDeleteMiddleware,
	FacultyUploadVerification
} from "../Middlewares/AuthVerification.js";
import aws from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';
import multerS3 from 'multer-s3'
import multer from 'multer'
const FacultyMaterialRoutes = express.Router();

config();
console.log("process.env.AWS_ACCESS_KEY", process.env.AWS_ACCESS_KEY)
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.REGION,
});

const BUCKET = process.env.BUCKET
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            const fileName = uuidv4() + '-' + file.originalname; // Generate a unique filename
            cb(null, fileName)
        }
    })
})


FacultyMaterialRoutes.route('/').post(FacultyUploadVerification, UploadFacultyMaterials).get(GetFacultyMaterials);
// FacultyMaterialRoutes.route('/video').post(upload.single('file'),  UploadFacultyMaterials)
FacultyMaterialRoutes.route('/:facultyId/:subject/:class/:linkId').delete(FacultyDeleteMiddleware, DeleteFacultyMaterials);
export default FacultyMaterialRoutes;