import express from "express"
import cors from "cors"
import morgan from "morgan"
import ContactRoutes from "./Routes/contactRoutes.js"
import RegisterationRoutes from "./Routes/RegisterationRoutes.js"
import LoginRoutes from "./Routes/LoginRoutes.js"
import FacultyMaterialRoutes from "./Routes/FacultyMaterialRoutes.js";
import FacultyRoutes from "./Routes/FacultyRoutes.js";
import {AddRating} from "./Controller/FeedbackController.js";
import axios from "axios"


const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: ["http://localhost:3000", "https://www.ffsboyswah.com"],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))

app.use('/contact', ContactRoutes);
app.use('/register', RegisterationRoutes);
app.use('/login', LoginRoutes);
app.use('/faculty', FacultyMaterialRoutes);
app.use('/getFaculty', FacultyRoutes);
app.post('/feedback', AddRating);
app.use('*', (req, res) =>{
    res.status(400).json({
        status: 'error',
        message: 'Invalid Query'
    })
})
export default app;