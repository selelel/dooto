
import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (err: any) {
      res.status(400).json({
        message: `Validation failed: ${err.message}`,
        errors: err.errors,
      });
    }
  };
