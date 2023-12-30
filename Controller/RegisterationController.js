import RegisterationModel from "../Model/RegisterationModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"
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
	const password = encrypt(req.body.password);
	const body = {...req.body, password: password};

	try{
		const data = await RegisterationModel.create(body);
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