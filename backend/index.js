import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from "./Routes/authRoute.js"
import userRouter from './Routes/userRouter.js';
import doctorRouter from './Routes/doctorRouter.js';
import bookingRouter from './Routes/bookingRouter.js';
import chatbotRouter from './Routes/chatbotRouter.js';
import reviewRouter from './Routes/reviewRouter.js';


dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
    origin:true
}

app.use((req, res, next) => {
    console.log('Request received:', req.method, req.path); // Log all requests
    next(); // Pass control to the next middleware or route handler
});

//database coonection
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB database is connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

//Middlware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/chatbot', chatbotRouter);
app.use('/api/v1/review', reviewRouter);


app.listen(port, () => {
    connectDB();
    console.log("Server is running on port " + port);
})
