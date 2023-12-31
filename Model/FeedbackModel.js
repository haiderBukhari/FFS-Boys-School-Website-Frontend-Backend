import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
	rating: Number,
	facultyName: String,
	message: String
})

export const FeedbackModel = mongoose.model('Feedback', RatingSchema)