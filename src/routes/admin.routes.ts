import express from "express";

import AdminController from "../controllers/admin.controller";
import AdminRepository from "../repository/admin.repo";

const router = express.Router();
const adminRepo = new AdminRepository();
const adminController = new AdminController(adminRepo);

router.get("/users", adminController.getAllUsershandler);
router.get("/expenses", adminController.getAllExpenseshandler);

export default router;
