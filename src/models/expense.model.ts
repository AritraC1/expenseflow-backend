import mongoose from "mongoose";

import { CATEGORIES } from "../constants/categories";

const ExpenseModel = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(CATEGORIES),
      default: CATEGORIES.FOOD,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Expense = mongoose.model("expense", ExpenseModel);

export default Expense;
