import jwt from "jsonwebtoken"
export const FacultyAuthVerification = (req, res, next) => {
	const secret = process.env.ENCRYPTION_SECRET;
	const jwtToken = req.headers.authorization.split(" ")[1];
	jwt.verify(jwtToken, secret, (err, data) => {
		if (err) {
			return res.status(401).json({
				status: "error",
				message: "Unauthorized"
			})
		}
		next()
	})
}