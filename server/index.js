import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import cloudinary from "cloudinary";
// Importing routes
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js"

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const port = process.env.PORT;

const app = express();

app.use(express.json());
// Using routes
app.use("/api", userRouter);
app.use("/api", productRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});
