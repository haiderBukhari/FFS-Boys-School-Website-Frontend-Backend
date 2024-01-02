import FacultyMaterialsModel from "../Model/FacultyMaterialsModel.js";
import mongoose from "mongoose"
import RegisterationModel from "../Model/RegisterationModel.js";
export const UploadFacultyMaterials = async (req, res) => {
	try {
		const FacultyData = await FacultyMaterialsModel.findOne({
			facultyId: req.body.facultyId,
			subject: req.body.subject.toLowerCase(),
			class: req.body.class
		});
		if (!FacultyData) {
			const data = await FacultyMaterialsModel.create({
				subject: req.body.subject.toLowerCase(),
				class: req.body.class,
				facultyId: req.body.facultyId,
				link: [{
					title: req.body.title,
					link: req.body.link,
					description: req.body.description,
					isDriveData: req.body.isDriveData
				}]
			});
			return res.status(200).json({
				status: "success",
				data
			});
		}

		FacultyData.link.unshift({
			title: req.body.title,
			link: req.body.link,
			description: req.body.description,
			isDriveData: req.body.isDriveData
		});

		await FacultyMaterialsModel.updateOne({
			facultyId: req.body.facultyId,
			subject: req.body.subject.toLowerCase(),
			class: req.body.class
		}, {
			link: FacultyData.link
		});

		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(404).json({
			status: "error",
			error: err.message
		});
	}
};

export const GetFacultyMaterials = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.query.facultyId)) {
		return res.status(400).json({
			status: 'error',
			error: 'Invalid faculty id',
		});
	}
	const FacultyData = await FacultyMaterialsModel.findOne({
		facultyId: req.query.facultyId,
		subject: req.query.subject.toLowerCase(),
		class: req.query.class
	});
	try{
		if (!FacultyData) {
			const verifyRegisteration = await RegisterationModel.findOne({
				facultyId: req.query.facultyId
			})
			if(!verifyRegisteration){
				throw new Error("No Data Uploaded By Faculty Yet!");
			}
			throw new Error("Faculty Not Registered");
		}
		res.status(200).json({
			status: "success",
			FacultyData
		});
	}catch(err){
		res.status(404).json({
			status: "error",
			error: err.message
		})
	}

}