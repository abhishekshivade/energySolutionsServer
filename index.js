const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

// mongoose.connect("mongodb://127.0.0.1:27017/energySolution").then(()=> console.log("Connected to MongoDB")).catch(console.log('failed to connect MongoDB'))

mongoose.connect("mongodb+srv://abhishekshivade:Abhi%400037@hrms.xgr7jhd.mongodb.net/energySolution").then(()=> console.log("Connected to MongoDB")).catch(console.log('failed to connect MongoDB'))

app.use("/users", userRoutes, (req, res) => res.send("you are in user routes"));
app.use("/auth", authRoutes, (req, res) => res.send("you are in auth routes"));


app.listen(port, ()=> console.log(`Server is running on https://localhost:${port}`))