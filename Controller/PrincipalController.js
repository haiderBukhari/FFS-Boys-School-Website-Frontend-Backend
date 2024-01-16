import {PrincipalModel} from '../Model/PrincipalModel.js'
import {SendPrinicpalEmail} from "../utils/WriteToPrincipalEmail.js";


export const WriteToPrincipal = async (req, res) => {
	const name = req.body.name
	const emailId = req.body.email
	const mobile = req.body.mobile
	const className = req.body.className
	const message = req.body.message

		SendPrinicpalEmail(name, emailId, mobile, className, message)
	try{
		const data = await PrincipalModel.create({
			name: name,
			email: emailId,
			phone: mobile,
			class: className,
			message: message
		})
		res.status(200).json({
			status: "success",
			data
		})
	}catch(err){
		res.status(400).json({
			status: "failed",
			message: err.message
		})
	}
}


export const GetPrincipalResponses = async (req, res) => {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		const actionTaken = req.query.actionTaken || ""
		const skip = (page - 1) * limit;
		let data;
		if((actionTaken==="true" || actionTaken==="false") && actionTaken!==""){
			data = await PrincipalModel.find({actionTaken: actionTaken}).skip(skip).limit(limit).sort({date: -1});
		}
		else{
			data = await PrincipalModel.find({}).skip(skip).limit(limit).sort({date: -1});
		}
		res.status(200).json({
			status: "success",
			data,
			length: data.length
		})
	} catch (err) {
		res.status(400).json({
			status: "error",
			error: err.message
		})
	}
}