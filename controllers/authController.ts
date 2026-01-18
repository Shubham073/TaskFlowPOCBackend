import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readUsers, writeUsers } from '../utils/jsonDb';

const SECRET = 'taskflow_secret';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const users = await readUsers();
  const user = users.find((u: any) => u.username === username);
  if (!user) {
    console.log(`[AUTH] Failed login for username: ${username}`);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if (password !== user.password) {
    console.log(`[AUTH] Failed login for username: ${username}`);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, SECRET, { expiresIn: '1h' });
  console.log(`[AUTH] User logged in: ${username}`);
  res.json({ token, role: user.role });
};

export const logout = (req: Request, res: Response) => {
  // For stateless JWT, logout is handled on client by deleting token
  const user = (req as any).user;
  if (user) {
    console.log(`[AUTH] User logged out: ${user.username}`);
  }
  res.json({ message: 'Logged out' });
};
