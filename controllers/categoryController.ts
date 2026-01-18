import { Request, Response } from 'express';
import { readCategories, writeCategories } from '../utils/jsonDb';
import { v4 as uuidv4 } from 'uuid';

export const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Category name required' });
  const categories = await readCategories();
  if (categories.find((c: any) => c.name === name)) {
    return res.status(409).json({ message: 'Category already exists' });
  }
  const newCategory = { id: uuidv4(), name };
  categories.push(newCategory);
  await writeCategories(categories);
  console.log(`[CATEGORY] Added by ${(req as any).user?.username || 'unknown'}: ${name}`);
  res.status(201).json(newCategory);
};

export const getCategories = async (req: Request, res: Response) => {
  let categories = await readCategories();
  // If categories is an array of strings, convert to array of objects
  if (Array.isArray(categories) && typeof categories[0] === 'string') {
    categories = categories.map((name: string, idx: number) => ({ id: String(idx + 1), name }));
  }
  console.log(`[CATEGORY] Fetched by ${(req as any).user?.username || 'unknown'} Categories list: ${categories.map((c: any) => c.name).join(', ')}`);
  res.json(categories);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  let categories = await readCategories();
  const idx = categories.findIndex((c: any) => c.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Category not found' });
  categories.splice(idx, 1);
  await writeCategories(categories);
  console.log(`[CATEGORY] Deleted by ${(req as any).user?.username || 'unknown'}: ${id}`);
  res.json({ message: 'Category deleted' });
};
