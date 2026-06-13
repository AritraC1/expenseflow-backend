import express from "express";

import AdminController from "../controllers/admin.controller";
import AdminRepository from "../repository/admin.repo";
import ExpenseRepository from "../repository/expense.repo";
import AnalyticsServices from "../services/analytics.service";

const router = express.Router();
const adminRepo = new AdminRepository();
const expenseRepo = new ExpenseRepository()
const analyticsService = new AnalyticsServices(expenseRepo);
const adminController = new AdminController(adminRepo, analyticsService);

router.get("/users", adminController.getAllUsershandler);
router.get("/expenses", adminController.getAllExpenseshandler);

// Analytics routes
router.get("/analytics/category", adminController.expenseByCategoryHandler)
router.get("analytics/top-users", adminController.topSpendingUsersHandler)
router.get("analytics/average", adminController.averageExpenseAmountHandler)
router.get("analytics/monthly", adminController.monthlyExpenseHandler)

export default router;
