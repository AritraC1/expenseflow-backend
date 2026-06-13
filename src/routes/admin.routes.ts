import express from "express";

import AdminController from "../controllers/admin.controller";
import AdminRepository from "../repository/admin.repo";
import ExpenseRepository from "../repository/expense.repo";
import AnalyticsServices from "../services/analytics.service";

const router = express.Router();

const adminRepo = new AdminRepository();
const expenseRepo = new ExpenseRepository();
const analyticsService = new AnalyticsServices(expenseRepo);
const adminController = new AdminController(adminRepo, analyticsService);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management and analytics endpoints
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       500:
 *         description: Internal server error
 */
router.get("/users", adminController.getAllUsershandler);

/**
 * @swagger
 * /admin/expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Successfully retrieved all expenses
 *       500:
 *         description: Internal server error
 */
router.get("/expenses", adminController.getAllExpenseshandler);

/**
 * @swagger
 * /admin/analytics/category:
 *   get:
 *     summary: Get expense analytics grouped by category
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Expense statistics by category
 *       500:
 *         description: Internal server error
 */
router.get("/analytics/category", adminController.expenseByCategoryHandler);

/**
 * @swagger
 * /admin/analytics/top-users:
 *   get:
 *     summary: Get top spending users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of users ranked by spending
 *       500:
 *         description: Internal server error
 */
router.get("/analytics/top-users", adminController.topSpendingUsersHandler);

/**
 * @swagger
 * /admin/analytics/average:
 *   get:
 *     summary: Get average expense amount
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Average expense amount calculated successfully
 *       500:
 *         description: Internal server error
 */
router.get("/analytics/average", adminController.averageExpenseAmountHandler);

/**
 * @swagger
 * /admin/analytics/monthly:
 *   get:
 *     summary: Get monthly expense analytics
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Monthly expense statistics
 *       500:
 *         description: Internal server error
 */
router.get("/analytics/monthly", adminController.monthlyExpenseHandler);

export default router;
