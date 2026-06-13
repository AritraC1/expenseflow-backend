import AdminRepository from "../repository/admin.repo";

class AdminController {
  constructor(private readonly adminRepo: AdminRepository) {}

  // Get all users
  getAllUsershandler = () => {
    return this.adminRepo.allUsers();
  };

  // get all expenses
  getAllExpenseshandler = () => {
    return this.adminRepo.allExpenses();
  };
}

export default AdminController;
