import Expense from "../models/expense.model";

class ExpenseRepository {
  // Find by id
  findById = (id: string) => {
    return Expense.findById(id);
  };

  // Find by name
  findByName = (title: string) => {
    return Expense.find({ title });
  };

  // find all by category
  findAllByCategory = (category: string) => {
    return Expense.find({ category });
  };

  // Create a new expense entry
  create = (
    userId: string,
    title: string,
    amount: number,
    category: string,
  ) => {
    const newEntry = Expense.create({
      user_id: userId,
      title,
      amount,
      category,
    });

    return newEntry;
  };

  // Update an expense entry
  update = (
    id: string,
    updateData: Partial<{ title: string; amount: number; category: string }>,
  ) => {
    return Expense.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  };

  // Delete an expense entry
  delete = (id: string) => {
    return Expense.findByIdAndDelete(id);
  };

  // Find all expenses of a user
  findByUserId = (userId: string) => {
    return Expense.find({ user_id: userId });
  };

  // Analytics

  // Expense by category
  expenseByCategory = () => {
    return Expense.aggregate([
      {
        $group: {
          _id: "$category",
          totalExpense: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalExpense: 1,
        },
      },
    ]);
  };

  // Top Spending Users
  topSpendingUser = () => {
    return Expense.aggregate([
      { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } },
      { $sort: { totalSpent: -1 } },
    ]);
  };

  // Average Expense Amount
  average = () => {
    return Expense.aggregate([
      { $group: { _id: null, averageExpense: { $avg: "$amount" } } },
    ]);
  };

  // Monthly Expense Report
  monthly = () => {
    return Expense.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);
  };
}

export default ExpenseRepository;
