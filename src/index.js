import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import connectDB from "./db/index.js";
import app from "./app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
    path: path.join(__dirname, '../.env')
})

connectDB()
.then(() => {
    app.listen(process.env.PORT , () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


