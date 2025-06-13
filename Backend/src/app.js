import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Static file serving
app.use(express.static("public")); // General public folder
app.use("/files", express.static(path.join(__dirname, "./public/temp"))); // Uploaded files

// Routes
import userRouter from "./routes/user.routes.js";
import fileRouter from "./routes/file.routes.js";

app.use("/api/v1/files", fileRouter);
app.use("/api/v1/users", userRouter);

// ✅ View PDF route (inline view in browser)
app.get("/view/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "public", "temp", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
  res.sendFile(filePath);
});

// Frontend static serving
// const frontendPath = path.join(__dirname, "../../Frontend/dist");
// app.use(express.static(frontendPath));

// // ⬇️ This MUST come last, after all API + static routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

export { app };
