// // server.js
// import express from "express";
// import dotenv from "dotenv";
// import authRoutes from "../src/routes/auth.route.js";
// import userRoutes from "../src/routes/user.route.js";
// import chatRoutes from "../src/routes/chat.route.js";
// import connectDB from "../src/lib/db.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173", // frontend domain
//     credentials: true,
//   })
// );

// // Connect to MongoDB
// connectDB();

// // Routes
// app.get("/", (req, res) => {
//   res.send("✅ Basic ES Module Express Server is running on Vercel...");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);

// // ❌ DO NOT use app.listen() on Vercel
// export default app; // ✅ Required for Vercel


// src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS (use your frontend domain in production)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Connect DB
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Serve frontend build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ❌ No app.listen() for Vercel
export default app;
