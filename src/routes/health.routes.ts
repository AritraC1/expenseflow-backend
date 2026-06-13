import express, { Response } from "express";
import mongoose from "mongoose";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health monitoring endpoints
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check server health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */

// Server health endpoint
router.get("/", (_, res: Response) => {
  return res.status(200).json({ status: "ok" });
});

/**
 * @swagger
 * /health/db-health:
 *   get:
 *     summary: Check MongoDB connection health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Database is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mongodb:
 *                   type: string
 *                   example: connected
 *                 state:
 *                   type: integer
 *                   example: 1
 *                 status:
 *                   type: string
 *                   example: healthy
 *       503:
 *         description: Database is unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mongodb:
 *                   type: string
 *                   example: disconnected
 *                 state:
 *                   type: integer
 *                   example: 0
 *                 status:
 *                   type: string
 *                   example: unhealthy
 */
// DB Health check endpoint
router.get("/db-health", (_, res: Response) => {
  const state = mongoose.connection.readyState;

  const statusMap: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const isHealthy = state === 1;

  return res.status(isHealthy ? 200 : 503).json({
    mongodb: statusMap[state] ?? "unknown",
    state,
    status: isHealthy ? "healthy" : "unhealthy",
  });
});

export default router;
