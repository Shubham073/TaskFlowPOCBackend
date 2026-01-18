import bcrypt from 'bcryptjs';
import { writeUsers } from '../utils/jsonDb';
import { User } from '../models/types';
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  const users: User[] = [
    {
      id: uuidv4(),
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    },
    {
      id: uuidv4(),
      username: 'user1',
      password: await bcrypt.hash('user123', 10),
      role: 'user'
    }
  ];
  await writeUsers(users);
  console.log('Seeded users:', users.map(u => ({ username: u.username, role: u.role })));
}

seed();
