import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env";
import { UserJwtPayload } from "../interfaces/payload";

// Create Access Token
export const createAccessToken = (userId: string, email: string) => {
  const payload = {
    _id: userId,
    email: email,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY);

  return token;
};

// Create Refresh Token
export const createRefreshToken = (userId: string, email: string) => {
  const payload = {
    _id: userId,
    email: email,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY);

  return token;
};

// validate token
export const validateToken = (token: string): UserJwtPayload => {
  const payload = jwt.verify(token, JWT_SECRET_KEY);

  if (typeof payload === "string") {
    throw new Error("Invalid token payload");
  }

  return payload as UserJwtPayload;
};
