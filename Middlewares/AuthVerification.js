import {verifyUser} from "../Controller/AuthVerificationController.js";

export const FacultyUploadVerification = (req, res, next) => {
	if(!req.body.facultyId || !req.body.subject || !req.body.class){
		return res.status(404).json({
			status: "failed",
			message: "Invalid Credentials",
		})
	}
	const jwtToken = req.headers['authorization'].split(' ')[1];
	if(!verifyUser(req.body.facultyId, jwtToken, req.body.subject, req.body.class)){
		return res.status(404).json({
			status: "failed",
			message: "Invalid Credentials",
		})
	}
	next();
}

export const FacultyDeleteMiddleware = (req, res, next) => {
	if(!req.params.facultyId || !req.params.subject || !req.params.class || !req.params.linkId){
		return res.status(404).json({
			status: "failed",
			message: "Invalid Credentials",
		})
	}
	const jwtToken = req.headers['authorization'].split(' ')[1];
	if(jwtToken==="null" || !verifyUser(req.params.facultyId, jwtToken, req.params.subject, req.params.class)){
		return res.status(404).json({
			status: "failed",
			message: "Try Logout and Login again",
		})
	}
	next();
}