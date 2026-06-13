import express from "express";
import AdminController from "../controllers/admin.controller";

const router = express.Router();
const adminController = new AdminController()

router.get("/users", adminController.getAllUsershandler);
router.get("/expenses", adminController.getAllExpenseshandler);

export default router;
