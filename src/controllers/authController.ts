import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

import { AuthRequest } from "../middleware/authMiddleware";

export const register = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, userName } = req.body;
  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, userName },
    });
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user!.password);
    if (!valid) res.status(400).json({ message: "Invalid credentials" });

    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({ id: user!.id }, secret, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
