import FacultyMaterialsModel from "../Model/FacultyMaterialsModel.js";
import mongoose from "mongoose"
import RegisterationModel from "../Model/RegisterationModel.js";
export const UploadFacultyMaterials = async (req, res) => {
	// console.log(req.body.location)
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
				name: req.body.name,
				Facultytitle: req.body.Facultytitle,
				link: [{
					title: req.body.title,
					link: req.body.link,
					description: req.body.description || '',
					isLink: req.body.isLink,
					isMeetingLink: req.body.isMeetingLink,
					uploadedDate: Date.now()
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
			isDriveData: req.body.isDriveData,
			uploadedDate: Date.now()
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
	const query = req.query.find || "";
	const page = parseInt(req.query.page) || 1;
	const pageSize = parseInt(req.query.pageSize) || 10;

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

	try {
		if (!FacultyData) {
			const verifyRegistration = await RegisterationModel.findOne({
				facultyId: req.query.facultyId
			})
			if (!verifyRegistration) {
				throw new Error("No Material Uploaded By Faculty Yet!");
			}
			throw new Error("Faculty Not Registered");
		}

		const Links = FacultyData.link.filter((Item => {
			return Item.title.toLowerCase().includes(query.toLowerCase()) || Item.description.toLowerCase().includes(query.toLowerCase());
		}));

		if (!Links.length) {
			throw new Error("No Data Found");
		}

		// Implement pagination
		const startIndex = (page - 1) * pageSize;
		const endIndex = page * pageSize;
		const paginatedLinks = Links.slice(startIndex, endIndex);

		FacultyData.link = paginatedLinks;

		res.status(200).json({
			status: "success",
			FacultyData
		});
	} catch (err) {
		res.status(404).json({
			status: "error",
			error: err.message
		})
	}
}

// Delete Faculty Materials Link
export const DeleteFacultyMaterials = async (req, res) => {
	try {
		const facultyId = req.params.facultyId;
		const subject = req.params.subject.toLowerCase();
		const classValue = req.params.class;
		const linkIdToDelete = req.params.linkId;

		const FacultyData = await FacultyMaterialsModel.findOne({
			facultyId,
			subject,
			class: classValue
		});

		if (!FacultyData) {
			return res.status(404).json({
				status: "error",
				error: "Faculty Materials not found"
			});
		}

		const linkIndexToDelete = FacultyData.link.findIndex(link => link._id.equals(linkIdToDelete));

		if (linkIndexToDelete === -1) {
			return res.status(404).json({
				status: "error",
				error: "Link not found"
			});
		}
		FacultyData.link.splice(linkIndexToDelete, 1);

		if(FacultyData.link.length === 0){
			await FacultyMaterialsModel.deleteOne({
				facultyId,
				subject,
				class: classValue
			})
			return res.status(200).json({
				status:"success"
			})
		}

		await FacultyData.save();

		res.status(200).json({
			status: "Deleted",
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			error: err.message
		});
	}
};