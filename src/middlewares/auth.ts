import { Request, Response, NextFunction } from "express";

import { validateToken } from "../utils/jwt";
import UserRepository from "../repository/user.repo";

const userRepo = new UserRepository();

const checkForJWT = (cookieName = "accessToken") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let token = null;

    // check cookies
    token = req.cookies[cookieName];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token missing",
      });
    }

    try {
      const userPayload = validateToken(token);
      if (!userPayload?._id) {
        return res.status(401).json({
          message: "Unauthorized: Invalid token payload",
        });
      }

      // verify user still exists in DB
      const user = await userRepo.findById(userPayload._id.toString());
      if (!user) {
        return res.status(401).json({
          message: "Unauthorized: User no longer exists",
        });
      }

      // attach full user
      req.user = user;

      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
      });
    }
  };
};

export default checkForJWT;
