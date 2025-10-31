let users = [
  { id: 1, name: 'Muntaha', email: 'muntaha@example.com' },
  { id: 2, name: 'Ali', email: 'ali@example.com' }
];

// get all users
const getAllUsers = (req, res) => {
  res.json(users);
};

// get user by id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

// create user
const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// update user
const updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

  users[index] = { id, name, email };
  res.json(users[index]);
};

// delete user
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  users.splice(index, 1);
  res.json({ message: 'User deleted' });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
