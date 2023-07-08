const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes =require("./routes/userRoutes");
const chatroutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // to accept JSON data

app.get('/',(req,res) => {
    res.send("API is running successfully");
})

app.use('/api/user',userRoutes);
app.use('/api/chat',chatroutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000,console.log(`server started on PORT ${PORT}`.yellow.bold));