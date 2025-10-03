const User = require('../models/user');

// Create user
exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Find user by email
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Find user by ID
exports.findUserById = async (id) => {
  return await User.findById(id);
};
