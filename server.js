import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db.js";

import MangaRouter from "./routes/index.js";
import path from "path";

connectDB();
const app = express();
const port = process.env.PORT || 5000;

// app.use(cors());

// app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(express.static("images"));
// app.use("/images", express.static("images"));
app.use(express.static("public"));

app.use("/api", MangaRouter);

app.listen(port, () => {
  console.log(`connected and running on port: ${port}`);
});

export default app;
