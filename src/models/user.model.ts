import mongoose from "mongoose";

import { ROLES } from "../constants/roles";

// User model
const UserModel = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("users", UserModel);

export default User;
