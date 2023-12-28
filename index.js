import express from "express"
import cors from "cors"
import morgan from "morgan"
import ContactRoutes from "./Routes/contactRoutes.js"
import RegisterationRoutes from "./Routes/RegisterationRoutes.js"
import LoginRoutes from "./Routes/LoginRoutes.js"

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))

app.use('/contact', ContactRoutes);
app.use('/register', RegisterationRoutes);
app.use('/login', LoginRoutes);

export default app;