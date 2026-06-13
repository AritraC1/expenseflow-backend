import express from "express";

import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import expenseRoutes from "./expense.routes";
import adminRoutes from "./admin.routes"

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/expenses", expenseRoutes);
router.use("/admin", adminRoutes);

export default router;
