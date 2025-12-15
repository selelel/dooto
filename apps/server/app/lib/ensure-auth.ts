import { Request } from "../types/express";
import { NextFunction, Response } from "express";

export const ensureSessionAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "Not authenticated" });
  }