import Expense from "../models/expense.model";
import User from "../models/user.model";

class AdminRepository {
  // get all users
  allUsers = () => {
    return User.find().exec();
  };

  // get all expenses
  allExpenses = () => {
    return Expense.find().exec();
  };
}

export default AdminRepository;
