import mongoose from "mongoose";


const RegisterationScheme = new mongoose.Schema({
	name: String,
	title: String,
	email: {
		type: String,
		unique: true
	},
	password: String,
	contactNumber: String,
	assignedClasses: [
		{
			"class": String,
			"subjects": [
				{
					type: String
				}
			]
		}
	]
})

const RegisterationModel = mongoose.model("Registeration", RegisterationScheme);
export default RegisterationModel