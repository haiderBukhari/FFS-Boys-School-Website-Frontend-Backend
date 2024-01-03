import mongoose from 'mongoose';

const FacultyMaterialSchema = new mongoose.Schema({
	subject: {
		type: String,
		index: true
	},
	class: {
		type: String,
		index: true
	},
	name: String,
	facultyId: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
	},
	link: [
		{
			title: String,
			link: String,
			description: String,
			isDriveData: Boolean,
			uploadedDate: {
				type: Date,
				default: Date.now,
			},
		}
	]
})

const FacultyMaterialsModel = mongoose.model('FacultyMaterial', FacultyMaterialSchema)

export default FacultyMaterialsModel;