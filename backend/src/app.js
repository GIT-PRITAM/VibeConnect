import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routers.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));



app.use("/api/v1/users", userRoutes);

const start = async () => {
    const connectionDb = await mongoose.connect(MONGODB_URI);

    server.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port")}`);
    })
}

start();