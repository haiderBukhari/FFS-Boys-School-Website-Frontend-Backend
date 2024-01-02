import jwt from "jsonwebtoken";
import RegisterationModel from "../Model/RegisterationModel.js";
export const verifyUser = async (facultyId, JWT_Token, subject, className) => {
	const secret = process.env.ENCRYPTION_SECRET;
	const tokenDetails = jwt.verify(JWT_Token, secret);
	if(!tokenDetails || tokenDetails.data._id !== facultyId) return false;
	const userDetail = await RegisterationModel.findOne({_id: facultyId});
	if(!userDetail) return false;
	const checkValidation = tokenDetails.data.assignedClasses.some((Item)=>{
		if(Item.class === className && Item.subjects.includes(subject.toLowerCase())) return true;
	})
	if(!checkValidation) return false;
	return true;
}