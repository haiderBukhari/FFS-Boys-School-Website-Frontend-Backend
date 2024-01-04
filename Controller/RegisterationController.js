import RegisterationModel from "../Model/RegisterationModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import {SendEmail} from "../utils/SendEmail.js"
import {configDotenv} from "dotenv";
configDotenv();

const algorithm = 'aes-256-cbc';
const secret = process.env.ENCRYPTION_SECRET;

const key = crypto.scryptSync(secret, 'salt', 32);
const iv = Buffer.alloc(16, 0);

function encrypt(string){
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(string, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
}

function decrypt(string){
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	let decrypted = decipher.update(string, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}


export const AddFaculty = async (req, res) => {
	const temppassword = Math.floor(Math.random()*1873637 +40000) .toString();
	const password = encrypt(temppassword);
	const body = {...req.body, password: password};
	try{
		const data = await RegisterationModel.create(body);
		SendEmail(req.body.email, temppassword, req.body.name);
		res.status(200).json({
			status: "success",
			data
		})
	}catch(err){
		res.status(404).json({
			status: "error",
			error: err.message
		})
	}
}

export const LoginFaculty = async (req, res) => {
	console.log(decrypt("d0a9e0b0abbe1b724494d5bf42932b00"))
	const body = req.body;
	try {
		const data = await RegisterationModel.findOne({ email: body.email });
		if (!data) {
			throw new Error('User not found');
		}
		if(req.body.password !== decrypt(data.password)){
			throw new Error('Password does not match');
		}
		const token = jwt.sign({ data }, secret);
		return res.status(200).json({
			status: "success",
			data,
			token: token
		});
	} catch (err) {
		return res.status(404).json({
			status: "error",
			message: err.message
		});
	}
}
export const GetAllRegisteredFaculty = async (req, res) => {
	const data = await RegisterationModel.find({ email: { $ne: 'admin@gmail.com' } });
	try{
		res.status(200).json({
			status: "success",
			data
		})
	}catch(err){
		res.status(404).json({
			status: "error",
			error: err.message
		})
	}
}

export const getAllFacultyByClassandSubject = async (req, res) => {
	const desiredClass = req.query.class;
	const desiredSubject = req.query.subject.toLowerCase();
	const data = await RegisterationModel.find({
		'assignedClasses.class': desiredClass,
		'assignedClasses.subjects': {
			$elemMatch: {
				$regex: new RegExp(desiredSubject, 'i')
			}
		}
	}, {name: 1, title: 1, _id: 1});
	console.log(data)
	try{
		res.status(200).json({
			status: "success",
			data
		})
	}catch(e){
		res.status(404).json({
			status: "error",
			error: e.message
		})
	}
}

export const UpdateFaculty = async (req,res) => {
	try {
		const data = await RegisterationModel.findById(req.body.id);
		if (!data) {
			return res.status(404).json({ message: 'Faculty member not found' });
		}
		const {password, contactNumber, assignedClasses} = req.body;
		if(password){
			data.password = encrypt(password);
			data.isPasswordChanged = true;
		}
		if(contactNumber && assignedClasses){
			data.contactNumber = contactNumber;
			const assignedClassesNew = assignedClasses.map((assignment) => ({
				class: assignment.class,
				subjects: assignment.subjects.map((subject) => subject.toLowerCase()),
			}));
			data.assignedClasses = assignedClassesNew;
			data.isUserInfoChanged = true
		}
		await data.save();
		return res.status(200).json({
			status: 'success',
			data
		});
	} catch (error) {
		return res.status(404).json({
			status: "error",
			error: error.message
		});
	}

}

export const GetFacultyById = async (req, res) => {
	const id = req.params.id;
	const data = await RegisterationModel.findById(id);
	try{
		res.status(200).json({
			status: "success",
			data
		})
	}catch(err){
		res.status(404).json({
			status: "error",
			error: err.message
		})
	}
}

