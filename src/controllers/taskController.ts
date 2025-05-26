import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getTasks = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const tasks = await prisma.task.findMany({ where: { userId } });
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { title, description, scheduledAt } = req.body;

  try {
    const data: any = {
      title,
      userId,
    };

    if (description) data.description = description;
    if (scheduledAt) data.scheduledAt = new Date(scheduledAt);

    const task = await prisma.task.create({ data });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed, description, scheduledAt } = req.body;

  try {
    const data: any = {};
    if (title !== undefined) data.title = title;
    if (completed !== undefined) data.completed = completed;
    if (description !== undefined) data.description = description;
    if (scheduledAt !== undefined) data.scheduledAt = new Date(scheduledAt);

    const task = await prisma.task.update({
      where: { id },
      data,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id } });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
