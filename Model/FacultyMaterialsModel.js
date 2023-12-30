import mongoose from 'mongoose';

const FacultyMaterialSchema = new mongoose.Schema({
	title: String,
	description: String,
	link: String,
	subject: {
		type: String,
		index: true
	},
	class: {
		type: String,
		index: true
	},
	facultyId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
	}
})

const FacultyMaterialsModel = mongoose.model('FacultyMaterial', FcaultyMaterialSchema)

export default FacultyMaterialsModel;