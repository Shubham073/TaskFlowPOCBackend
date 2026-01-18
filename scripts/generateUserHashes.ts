const bcrypt = require('bcryptjs');

const users = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' },
  { id: '2', username: 'user1', password: 'user123', role: 'user' }
];

(async () => {
  for (const user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  console.log(JSON.stringify(users, null, 2));
})();
