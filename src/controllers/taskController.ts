import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getTasks = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const tasks = await prisma.task.findMany({ where: { userId } });
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { title } = req.body;
  const task = await prisma.task.create({ data: { title, userId } });
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await prisma.task.update({ where: { id }, data: { title, completed } });
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id } });
  res.json({ message: "Task deleted" });
};
