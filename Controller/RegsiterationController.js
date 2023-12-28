import RegisterationModel from "../Model/RegisterationModel.js";
import crypto from "crypto"
const algorithm = 'aes-256-cbc';
const secret = process.env.ENCRYPTION_SECRET || "";

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
	try{
		console.log(body);
		const data = await RegisterationModel.findOne({email: body.email});
		if(!data)throw new Error('');
		if(decrypt(data.password) !== req.body.password)throw new Error('');
		res.status(200).json({
			status: "success",
			data
		})
	}catch(err){
		res.status(404).json({
			status: "error",
			message: "Not Authenticated"
		})
	}
}