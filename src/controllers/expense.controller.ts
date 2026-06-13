import { Request, Response } from "express";
import ExpenseRepository from "../repository/expense.repo";

class ExpenseController {
  constructor(private readonly expenseRepo: ExpenseRepository) {}

  // create new expense
  createExpenseHandler = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString();

    const { title, amount, category } = req.body;

    const expense = await this.expenseRepo.create(
      userId,
      title,
      amount,
      category,
    );

    return res.status(201).json({ success: true, data: expense });
  };

  // Get all my expenses
  fetchMyExpenseHandler = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString();

    const expenses = await this.expenseRepo.findByUserId(userId);

    return res.status(200).json({ success: true, data: expenses });
  };

  // Update an expense
  updateExpenseHandler = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString();

    const expense = await this.expenseRepo.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user_id.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, amount, category } = req.body;

    const updated = await this.expenseRepo.update(id, {
      title,
      amount,
      category,
    });

    return res.status(200).json({ success: true, data: updated });
  };

  // Delete an expense
  deleteExpenseHandler = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString();

    const expense = await this.expenseRepo.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user_id.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await this.expenseRepo.delete(id);

    return res.status(200).json({ success: true, message: "Expense deleted" });
  };
}

export default ExpenseController;
