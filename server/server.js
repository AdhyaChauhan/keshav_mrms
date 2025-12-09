import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import doctorRoutes from "./routes/doctorRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/doctors", doctorRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/visits", visitRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
