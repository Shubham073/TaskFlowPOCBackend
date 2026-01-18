export type User = {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
};

export type Task = {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  completed: boolean;
  categories: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline: string;
  createdAt: string;
  updatedAt: string;
  lastUpdated: string;
};
