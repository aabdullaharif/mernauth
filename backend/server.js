import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import path from "path";

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(import.meta.url, "../public")));

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(
    `Server started on PORT:${process.env.PORT} at ${process.env.NODE_ENV}`
  )
);
