import express from "express";
import cors from "cors";
import cookieParser
from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit : "10kb"}))
app.use(express.urlencoded({extended: true, limit:"10kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//routes import
import userRouter from './routes/user.routes.js'
import noteRouter from './routes/note.routes.js'




app.use("/users", userRouter)
app.use("/notes", noteRouter)


export default app