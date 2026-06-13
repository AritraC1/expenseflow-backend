import express from "express";

import AdminController from "../controllers/admin.controller";
import AdminRepository from "../repository/admin.repo";
import ExpenseRepository from "../repository/expense.repo";
import AnalyticsServices from "../services/analytics.service";
import checkForJWT from "../middlewares/auth";
import requireRole from "../middlewares/role";
import { ROLES } from "../constants/roles";

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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all registered users
 *     description: Returns a list of all users. Accessible only by Admins.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied. Admin role required.
 *       500:
 *         description: Internal server error
 */
router.get(
  "/users",
  checkForJWT(),
  requireRole(ROLES.ADMIN),
  adminController.getAllUsershandler,
);

/**
 * @swagger
 * /admin/expenses:
 *   get:
 *     summary: Get all expenses
 *     description: Returns all expenses from all users. Accessible only by Admins.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expenses fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expenses:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied. Admin role required.
 *       500:
 *         description: Internal server error
 */
router.get(
  "/expenses",
  checkForJWT(),
  requireRole(ROLES.ADMIN),
  adminController.getAllExpenseshandler,
);

/**
 * @swagger
 * /admin/analytics/category:
 *   get:
 *     summary: Expense analytics by category
 *     description: Returns total expenses grouped by category.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                       totalAmount:
 *                         type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied. Admin role required.
 *       500:
 *         description: Internal server error
 */
router.get(
  "/analytics/category",
  checkForJWT(),
  requireRole(ROLES.ADMIN),
  adminController.expenseByCategoryHandler,
);

/**
 * @swagger
 * /admin/analytics/top-users:
 *   get:
 *     summary: Top spending users
 *     description: Returns users ranked by total spending.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top spending users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       totalSpent:
 *                         type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied. Admin role required.
 *       500:
 *         description: Internal server error
 */
router.get(
  "/analytics/top-users",
  checkForJWT(),
  requireRole(ROLES.ADMIN),
  adminController.topSpendingUsersHandler,
);

/**
 * @swagger
 * /admin/analytics/average:
 *   get:
 *     summary: Average expense amount
 *     description: Returns the average amount spent across all expenses.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Average expense calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageExpense:
 *                   type: number
 *                   example: 1250.75
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied. Admin role required.
 *       500:
 *         description: Internal server error
 */
router.get(
  "/analytics/average",
  checkForJWT(),
  requireRole(ROLES.ADMIN),
  adminController.averageExpenseAmountHandler,
);

/**
 * @swagger
 * /admin/analytics/monthly:
 *   get:
 *     summary: Monthly expense analytics
 *     description: Returns monthly expense totals grouped by month.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 monthlyExpenses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: "2025-06"
 *                       totalAmount:
 *                         type: number
 *                         example: 45000
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied. Admin role required.
 *       500:
 *         description: Internal server error
 */
router.get(
  "/analytics/monthly",
  checkForJWT(),
  requireRole(ROLES.ADMIN),
  adminController.monthlyExpenseHandler,
);

export default router;
