import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './db/connect.js'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import postRoutes from './routes/postRoutes.js'
const app = express()
const __dirname = path.resolve()

dotenv.config();

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use((req, res, next) => {
    // req.body.date = new Date().toLocaleString()
    console.log(req.body);
    next()
})
// Middlewares


// Routes
app.use('auth/api/v1/', authRoutes)
app.use('/api/v1/user', profileRoutes)
app.use('/api/v1/post', postRoutes)


app.use('/api/v1', express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.send("ghalat jagah aagaey ho, aesa koi route hi nahin hai")
})


const PORT = process.env.PORT || 8000
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Backend server is running`)
        })
        await connectDB(process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
    }
}
start()