import ExpenseRepository from "../repository/expense.repo";

class AnalyticsServices {
  constructor(private readonly expenseRepo: ExpenseRepository) {}

  // Expense by category
  expenseByCategory = async () => {
    return await this.expenseRepo.expenseByCategory();
  };

  // Top Spending Users
  topSpendingUser = async () => {
    return await this.expenseRepo.topSpendingUser();
  };

  // Average Expense Amount
  averageExpense = async () => {
    return await this.expenseRepo.average();
  };

  // Monthly Expense Report
  monthlyExpense = async () => {
    return await this.expenseRepo.monthly();
  };
}

export default AnalyticsServices;
