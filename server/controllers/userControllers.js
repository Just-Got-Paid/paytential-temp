const User = require('../models/User');

// Controller to handle user sign-up
async function signUp(req, res) {
  console.log('SignUp function called');
  const { username, password, email, organization, isAdmin } = req.body;

  try {
    // Create a new user using the User model's create method
    const user = await User.create(username, password, email, organization, isAdmin);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controller to list all users
async function listUsers(req, res) {
  try {
    const users = await User.list();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

// Controller to get a single user by ID
async function getUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.find(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

// Controller to update a user
async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email, organization, isAdmin } = req.body;

  try {
    const updatedUser = await User.update(id, username, email, organization, isAdmin);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controller to delete all users (useful for testing)
async function deleteAllUsers(req, res) {
  try {
    await User.deleteAll();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete all users' });
  }
}

module.exports = {
  signUp,
  listUsers,
  getUser,
  updateUser,
  deleteAllUsers,
};
