import {FeedbackModel} from "../Model/FeedbackModel.js";

export const AddRating = async (req, res) => {
	try {
		const data = await FeedbackModel.create(req.body);
		res.status(200).json({
			status: "success",
			data
		})
	} catch (err) {
		res.status(404).json({
			status: "error",
			error: err.message
		})
	}
}