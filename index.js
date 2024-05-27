import express from "express"
import cors from "cors"
import morgan from "morgan"
import ContactRoutes from "./Routes/contactRoutes.js"
import RegisterationRoutes from "./Routes/RegisterationRoutes.js"
import LoginRoutes from "./Routes/LoginRoutes.js"
import FacultyMaterialRoutes from "./Routes/FacultyMaterialRoutes.js";
import FacultyRoutes from "./Routes/FacultyRoutes.js";
import {AddRating} from "./Controller/FeedbackController.js";
import PrincipalRoutes from "./Routes/PrincipalRoutes.js";
import multer from "multer";

const upload = multer();
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/contact', ContactRoutes);
app.use('/register', RegisterationRoutes);
app.use('/login', LoginRoutes);
app.use('/faculty', FacultyMaterialRoutes);
app.use('/getFaculty', FacultyRoutes);
app.post('/feedback', AddRating);
app.use('/principal', PrincipalRoutes);

app.post('/upload-audio', upload.single('audio'), async (req, res) => {
    try {
        // Handle the uploaded audio file (req.file.buffer)
        console.log(req.body)
        const audioData = req.file.buffer;
        // Save the audio data in MongoDB
        console.log(audioData);
        console.log('Audio received and saved in MongoDB');
        res.status(200).send('Audio received and saved successfully');
    } catch (error) {
        console.error('Error handling audio on the backend:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.use('*', (req, res) =>{
    res.status(400).json({
        status: 'error',
        message: 'Invalid Query'
    })
})


export default app;