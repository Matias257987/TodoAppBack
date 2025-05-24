import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { verifyToken } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
//const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", verifyToken, taskRoutes);

app.listen(3001, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:3001`);
});
