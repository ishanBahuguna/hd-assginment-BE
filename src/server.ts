import express from "express";
import userRoute from "./routes/user"
import notesRoute from "./routes/notes";
import cors from "cors";


const PORT = 4000;
const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/v1/user" , userRoute);
app.use("/api/v1/notes" , notesRoute);

app.get("/" , (req , res) => {
    res.send("Hello")
})

app.listen(PORT , () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    
})
