import fs from 'fs/promises';
import path from 'path';

const usersPath = path.resolve(process.cwd(), 'data/users.json');
const tasksPath = path.resolve(process.cwd(), 'data/tasks.json');
const categoriesPath = path.resolve(process.cwd(), 'data/categories.json');
export const readCategories = async () => {
  try {
    const data = await fs.readFile(categoriesPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const writeCategories = async (categories: any) => {
  await fs.writeFile(categoriesPath, JSON.stringify(categories, null, 2));
};

export const readUsers = async () => {
  const data = await fs.readFile(usersPath, 'utf-8');
  return JSON.parse(data);
};

export const writeUsers = async (users: any) => {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
};

export const readTasks = async () => {
  const data = await fs.readFile(tasksPath, 'utf-8');
  return JSON.parse(data);
};

export const writeTasks = async (tasks: any) => {
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
};
