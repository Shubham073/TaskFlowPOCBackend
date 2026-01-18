import { Request, Response } from 'express';
import { readTasks, writeTasks } from '../utils/jsonDb';
import { v4 as uuidv4 } from 'uuid';

export const createTask = async (req: Request, res: Response) => {
  const { title, description, assignedTo, categories = [], priority = 'medium', deadline = '' } = req.body;
  const tasks = await readTasks();
  const now = new Date().toISOString();
  const newTask = {
    id: uuidv4(),
    title,
    description,
    assignedTo,
    completed: false,
    categories,
    priority,
    deadline,
    createdAt: now,
    updatedAt: now,
    lastUpdated: now
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  console.log(`[TASK] Created by ${(req as any).user?.username || 'unknown'}: ${title}`);
  res.status(201).json(newTask);
};

export const getTasks = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, completed, assignedTo, category, priority } = req.query;
  let tasks = await readTasks();
  if (completed !== undefined) {
    tasks = tasks.filter((t: any) => t.completed === (completed === 'true'));
  }
  if (assignedTo) {
    tasks = tasks.filter((t: any) => t.assignedTo === assignedTo);
  }
  if (category) {
    tasks = tasks.filter((t: any) => t.categories && t.categories.includes(category));
  }
  if (priority) {
    tasks = tasks.filter((t: any) => t.priority === priority);
  }
  const start = (Number(page) - 1) * Number(limit);
  const paginated = tasks.slice(start, start + Number(limit));
  console.log(`[TASK] Tasks fetched by ${(req as any).user?.username || 'unknown'}`);
  res.json({
    total: tasks.length,
    page: Number(page),
    limit: Number(limit),
    tasks: paginated
  });
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, assignedTo, categories, priority, deadline, completed } = req.body;
  const tasks = await readTasks();
  const idx = tasks.findIndex((t: any) => t.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });
  const now = new Date().toISOString();
  tasks[idx] = {
    ...tasks[idx],
    title: title ?? tasks[idx].title,
    description: description ?? tasks[idx].description,
    assignedTo: assignedTo ?? tasks[idx].assignedTo,
    categories: categories ?? tasks[idx].categories,
    priority: priority ?? tasks[idx].priority,
    deadline: deadline ?? tasks[idx].deadline,
    completed: completed ?? tasks[idx].completed,
    updatedAt: now,
    lastUpdated: now
  };
  await writeTasks(tasks);
  console.log(`[TASK] Updated by ${(req as any).user?.username || 'unknown'}: ${id}`);
  res.json(tasks[idx]);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  let tasks = await readTasks();
  const idx = tasks.findIndex((t: any) => t.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });
  tasks.splice(idx, 1);
  await writeTasks(tasks);
  console.log(`[TASK] Deleted by ${(req as any).user?.username || 'unknown'}: ${id}`);
  res.json({ message: 'Task deleted' });
};

export const markTaskCompleted = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const idx = tasks.findIndex((t: any) => t.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Task not found' });
  const now = new Date().toISOString();
  tasks[idx].completed = true;
  tasks[idx].updatedAt = now;
  tasks[idx].lastUpdated = now;
  await writeTasks(tasks);
  console.log(`[TASK] Marked completed by ${(req as any).user?.username || 'unknown'}: ${id}`);
  res.json(tasks[idx]);
};
