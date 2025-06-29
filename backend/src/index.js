import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();



const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Replace with your frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
};

app.use(cors(corsOptions));

// app.use(cors({
//     origin:"*",
//     credentials:true
// }));
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);


// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname,"../frontend/dist")));

//   app.get("*",(req,res) => {
//     res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
//   })
// }

// Serve static files first
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
// }

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Catch-all route for SPA (must come after API routes)
// if (process.env.NODE_ENV === "production") {
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   })
// }



server.listen(PORT, () => {
  console.log(`Server is running on port :`, PORT);
  connectDB();
})