import express from "express";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5001;


//middleware
app.use(express.json());
//get filemnname for, url
const __filename = fileURLToPath(import.meta.url);
//get dirname from filename
const __dirname = dirname(__filename);

//serves the HTML life  from public directory
app.use(express.static(path.join(__dirname, "../public")));


//Routes
app.use('/auth' , authRoutes);
app.use('/todos' , authMiddleware, todoRoutes);

//displaying the index html file
app.get("/", (req, res) => {
  
  res.sendFile(path.join(__dirname, "index.html")); 
})

app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
 
});



