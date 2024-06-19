const express = require("express");
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const userRouter = require('./routes/userRouter.js');
const connectDB = require("./config/db.js");

//configuration
const app = express();
dotenv.config()

//DB connection
connectDB()

//middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/api', userRouter)

app.get("/heart-beat", (req, res) => {
  res.send("API is working fine 💓!!!");
});

const PORT = process.env.PORT || 1000

//listening the server
app.listen(PORT, () => {
  console.log("Server is running on 🚀", PORT);
});
