import { Request as CustomRequest } from "../types/express";
import { NextFunction, Response, Request } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as unknown as CustomRequest;
    if (customReq.isAuthenticated?.()) {
      return next();
    }
    return res.status(401).json({ message: "Not authenticated" });
  }

  // Todo: isn't yet integrated
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as unknown as CustomRequest;
    if (customReq.isAuthenticated?.()) {
      return next();
    }
    return res.status(401).json({ message: "Not authenticated" });
}