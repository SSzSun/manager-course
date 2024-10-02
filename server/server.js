import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Default import
import courseRoutes from "./routes/courseRoutes.js"; // Default import

const app = express();
// const uri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://sszsun:hPEjRTdq8nyZUI9K@course-admin.rjnha.mongodb.net/?retryWrites=true&w=majority&appName=course-admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
