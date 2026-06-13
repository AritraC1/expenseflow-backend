import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

import allRoutes from "./routes/all.routes";
import connectToMongoDB from "./config/db";
import limiter from "./config/rateLimiter";

dotenv.config();

// Declarations
const app = express();
const PORT_NUMBER = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", allRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(limiter)

// Start server
const startServer = async () => {
  await connectToMongoDB();
  app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on port:${PORT_NUMBER}`);
  });
};

startServer();
