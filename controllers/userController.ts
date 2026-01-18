import { Request, Response } from 'express';
import { readUsers } from '../utils/jsonDb';

export const getUsers = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    console.log(`[USER] Unauthorized user list access attempt.`);
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  const { username, role } = req.query;
  let users = await readUsers();
  if (username) {
    users = users.filter((u: any) => u.username.toLowerCase().includes((username as string).toLowerCase()));
  }
  if (role) {
    users = users.filter((u: any) => u.role === role);
  }
  console.log(`[USER] User list fetched by admin: ${user.username}`);
  res.json(users.map(({ password, ...rest }: any) => rest));
};
