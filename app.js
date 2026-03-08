import { configDotenv } from "dotenv";
configDotenv();


import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middleware/authenticated.js";

const app= express();

connectDB();

app.use(express.static("public"));
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());
app.use(userRoutes);


app.get('/',isAuthenticated,(req,res)=>{
    console.log(req.user)
    res.render("logout", { name: req.user.name })
})
app.get('/register',(req,res)=>{
    res.render("register")
})
app.get('/logout', isAuthenticated, (req, res) => {
    res.render("logout", { name: req.user.name })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
