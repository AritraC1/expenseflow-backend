import express from "express";

import ExpenseController from "../controllers/expense.controller";
import ExpenseRepository from "../repository/expense.repo";

const router = express.Router();
const expenseRepo = new ExpenseRepository();
const expenseController = new ExpenseController(expenseRepo);

/**
 * @swagger
 * tags:
 *   name: Expense
 *   description: Expense management endpoints
 */

/**
 * @swagger
 * /expense/new:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expense]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Groceries
 *               amount:
 *                 type: number
 *                 example: 1200
 *               category:
 *                 type: string
 *                 example: Food
 *               description:
 *                 type: string
 *                 example: Weekly grocery shopping
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense created
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post("/new", expenseController.createExpenseHandler);

/**
 * @swagger
 * /expense/my:
 *   get:
 *     summary: Fetch logged-in user's expenses
 *     tags: [Expense]
 *     responses:
 *       200:
 *         description: List of user expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expenses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       category:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get("/my", expenseController.fetchMyExpenseHandler);

/**
 * @swagger
 * /expense/update/{id}:
 *   patch:
 *     summary: Update an expense
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense updated
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.patch("/update/:id", expenseController.updateExpenseHandler);

/**
 * @swagger
 * /expense/delete/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expense]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Expense deleted
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/delete/:id", expenseController.deleteExpenseHandler);

export default router;
