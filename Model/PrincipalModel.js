import mongoose from "mongoose";


const PrincipalScheme = mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	class: String,
	message: String,
	date: Date,
	audio: {
		type: {
			data: Buffer,
			type: String
		},
	},
	actionTaken: {
		type: Boolean,
		default: false,
	}
})

export const PrincipalModel = mongoose.model("WriteToPrincipal", PrincipalScheme);