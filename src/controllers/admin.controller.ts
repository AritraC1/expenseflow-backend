import { Request, Response } from "express";
import AdminRepository from "../repository/admin.repo";
import AnalyticsServices from "../services/analytics.service";

class AdminController {
  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly analytics: AnalyticsServices,
  ) {}

  // Get all users
  getAllUsershandler = async (req: Request, res: Response) => {
    try {
      const users = await this.adminRepo.allUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch users",
        error,
      });
    }
  };

  // get all expenses
  getAllExpenseshandler = async (req: Request, res: Response) => {
    try {
      const expenses = await this.adminRepo.allExpenses();
      return res.status(200).json(expenses);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch expenses",
        error,
      });
    }
  };

  // ANALYTICS
  expenseByCategoryHandler = async (req: Request, res: Response) => {
    try {
      const result = await this.analytics.expenseByCategory();
      return res.status(200).json({
        message: "Successful",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch analytics",
        error,
      });
    }
  };

  topSpendingUsersHandler = async (req: Request, res: Response) => {
    try {
      const result = await this.analytics.topSpendingUser();
      return res.status(200).json({
        message: "Successful",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch analytics",
        error,
      });
    }
  };

  averageExpenseAmountHandler = async (req: Request, res: Response) => {
    try {
      const result = await this.analytics.averageExpense();
      return res.status(200).json({
        message: "Successful",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch analytics",
        error,
      });
    }
  };

  monthlyExpenseHandler = async (req: Request, res: Response) => {
    try {
      const result = await this.analytics.monthlyExpense();
      return res.status(200).json({
        message: "Successful",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch analytics",
        error,
      });
    }
  };
}

export default AdminController;
