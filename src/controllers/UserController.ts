import { Response } from "express";

import prisma from "../prisma/client";
import { AuthRequest } from "../middleware/authMiddleware";

//Get user
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("GET USER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//Edit user
export const updateUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user!.id;
  const { email, userName } = req.body;
  try {
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        userName,
      },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });

    res.status(200).json({ message: "Profile updated", user: updateUser });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ message: "Email already in use" });
    }
    res.status(500).json({ message: "Server error" });
  }
};
