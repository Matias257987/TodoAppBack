import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.status(401).json({ message: "Access Denied" });

  try {
    const secret = process.env.JWT_SECRET || "secret";
    const verified = jwt.verify(token!, secret) as { id: string };
    req.user = { id: verified.id };
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
