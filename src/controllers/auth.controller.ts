import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import UserRepository from "../repository/user.repo";
import { createAccessToken, createRefreshToken } from "../utils/jwt";
import RefreshTokenRepository from "../repository/refreshToken.repo";

class AuthController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly refreshTokenRepo: RefreshTokenRepository,
  ) {}

  // Register
  registerHandler = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Credentials are required" });
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepo.createUser(name, email, hashedPassword);

    return res.status(201).json({
      message: "User created",
    });
  };

  // Login
  loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Credentials are required" });
    }

    // Check for existing user
    const existing = await this.userRepo.findByEmail(email);
    if (!existing) {
      return res.status(404).json({ message: "User not found" });
    }

    // login - Match email password
    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT tokens - access and refresh
    const accessToken = createAccessToken(existing.id, existing.email);
    const refreshToken = createRefreshToken(existing.id, existing.email);

    // Return tokens in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      path: "/",
    });

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    // save refresh in db
    await this.refreshTokenRepo.saveRefreshToken(
      existing.id,
      refreshTokenHash,
      new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      false,
      req.ip || "",
    );

    return res.status(200).json({ message: "Login successful", accessToken });
  };

  // Refresh JWT
  refreshJWTHandler = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          error: "Refresh token required",
        });
      }

      // Validate refresh token signature
      let userPayload;
      try {
        const { validateToken } = await import("../utils/jwt");
        userPayload = validateToken(refreshToken);
      } catch (error) {
        return res.status(401).json({
          error: "Invalid refresh token",
        });
      }

      if (!userPayload?._id) {
        return res.status(401).json({
          error: "Invalid token payload",
        });
      }

      // Find refresh token in database and validate it
      const storedToken =
        await this.refreshTokenRepo.getRefreshToken(refreshToken);

      if (!storedToken) {
        return res.status(401).json({
          error: "Refresh token not found",
        });
      }

      // Check if token is revoked
      if (storedToken.revoked) {
        return res.status(401).json({
          error: "Refresh token has been revoked",
        });
      }

      // Check if token is expired
      if (new Date() > storedToken.expires_at) {
        return res.status(401).json({
          error: "Refresh token has expired",
        });
      }

      // Generate new access token
      const newAccessToken = await import("../utils/jwt").then((mod) =>
        mod.createAccessToken(userPayload._id, userPayload.email),
      );

      // Set new access token cookie
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "lax",
        path: "/",
      });

      return res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Token refresh failed",
      });
    }
  };

  // Logout
  invalidateRefreshTokenAndLogoutHandler = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(400).json({
          error: "Refresh token required",
        });
      }

      // Find the refresh token record by token hash
      const storedTokenRecord =
        await this.refreshTokenRepo.getRefreshToken(refreshToken);

      // Clear cookies
      res.clearCookie("accessToken", {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "lax",
        path: "/",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "lax",
        path: "/",
      });

      // Revoke token in database if it exists
      if (storedTokenRecord) {
        await this.refreshTokenRepo.revokeRefreshToken(
          storedTokenRecord._id.toString(),
        );
      }

      return res.status(200).json({
        message: "Logout successful",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Logout failed",
      });
    }
  };
}

export default AuthController;
