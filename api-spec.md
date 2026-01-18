
# TaskFlow Management API Spec

## Logging

All API endpoints log requests and key actions (create, update, delete, fetch, login, logout) to the console with timestamps, user, and action details.

## Authentication

### POST /api/auth/login
- Request: `{ username, password }`
- Response: `{ token, role }`

### POST /api/auth/logout
- Request: None (JWT stateless)
- Response: `{ message }`

## Users

### GET /api/users
- Roles: admin only
- Query params (all optional): `username`, `role`
- Response: `[User]` (without password)

## Tasks

### POST /api/tasks
- Roles: admin, user
- Request: `{ title, description, assignedTo, categories: [string], priority: 'low'|'medium'|'high'|'critical', deadline: string }`
- Response: Task object

### GET /api/tasks
- Roles: admin, user
- Query params: `page`, `limit`, `completed`, `assignedTo`, `category`, `priority`
- Response: `{ total, page, limit, tasks: [Task] }`

### PUT /api/tasks/:id
- Roles: admin, user
- Request: `{ title?, description?, assignedTo?, categories?, priority?, deadline?, completed? }`
- Response: Task object

### DELETE /api/tasks/:id
- Roles: admin only
- Response: `{ message }`

### PATCH /api/tasks/:id/complete
- Roles: admin, user
- Response: Task object

## Categories

### POST /api/categories
- Roles: admin only
- Request: `{ name }`
- Response: Category object

### GET /api/categories
- Roles: admin, user
- Response: `[Category]`

### DELETE /api/categories/:id
- Roles: admin only
- Response: `{ message }`

## Data Models

### User
- id: string
- username: string
- role: 'admin' | 'user'

### Task
- id: string
- title: string
- description: string
- assignedTo: string
- completed: boolean
- categories: [string]
- priority: 'low' | 'medium' | 'high' | 'critical'
- deadline: string
- createdAt: string
- updatedAt: string
- lastUpdated: string

### Category
- id: string
- name: string

## Data
- All data is stored in JSON files (`data/users.json`, `data/tasks.json`, `data/categories.json`).
