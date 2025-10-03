const { validationResult } = require('express-validator');
const userModel = require('../models/user');
const userService = require('../service/user.service');
const blackListTokenModel = require('../models/blacklistToken');

// Register User
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname, password } = req.body;

    // If fullname is a string → split into first & last
    const [firstname, ...lastArr] = fullname.split(" ");
    const lastname = lastArr.join(" ") || "";

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    const token = user.generateAuthToken();

    return res.status(201).json({
      message: 'User created successfully',
      user,
      token
    });
  } catch (err) {
    next(err);
  }
};

// Login User
module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({
      message: 'Login successful',
      user,
      token
    });
  } catch (err) {
    next(err);
  }
};

// Get Profile
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

// Logout User
module.exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('token');
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (token) {
      await blackListTokenModel.create({ token });
    }

    res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};
