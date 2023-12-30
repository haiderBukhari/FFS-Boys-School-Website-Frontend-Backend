import FacultyMaterialsModel from "../Model/FacultyMaterialsModel.js"
import RegisterationModel from "../Model/RegisterationModel.js";

export const UploadFacultyMaterials	= async (req, res) => {
	const data = await FacultyMaterialsModel.create(req.body.password);
	try{
		res.status(200).json({
			status: "success",
			data
		})
	}catch(err){
		res.status(404).json({
			status: "error",
			error: err.message
		})
	}
}