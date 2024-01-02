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