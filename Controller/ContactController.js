import { ContactModel } from './../Model/ContactModel.js';

export const PostContact = async (req, res) => {
    const body = req.body;
    body["date"] = new Date();
    try {
        let data = await ContactModel.create(body);
        res.status(200).json({
            status: "success",
            data
        })
    } catch (err) {
        res.status(400).json({
            status: "error",
            error: err.message
        })
    }
}

export const GetContact = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const viewed = req.query.viewed || "" 
        const skip = (page - 1) * limit;
        let data;
        if((viewed==="true" || viewed==="false") && viewed!==""){
            data = await ContactModel.find({viewed: viewed}).skip(skip).limit(limit).sort({date: -1});
        }
        else{
            data = await ContactModel.find({}).skip(skip).limit(limit).sort({date: -1});
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

export const UpdateContact = async (req, res) => {
    try {
        let data = await ContactModel.findByIdAndUpdate(req.query.id, {viewed: true}, {new: true});
        res.status(200).json({
            status: "success",
            data
        })
    } catch (err) {
        res.status(400).json({
            status: "error",
            error: err.message
        })
    }
}

export const DeleteContact = async (req, res) => {
    try {
        console.log(req.query.id)
        await ContactModel.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status: "success",
        })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            status: "error",
            error: err.message
        })
    }
}