const { validationResult } = require('express-validator');
const userModel = require('../models/user');
const userService = require('../service/user.service');
const blackListTokenModel = require('../models/blacklistToken');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

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

    const user = await userService.createUser({
      firstname,
      lastname,
      email,
      password
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

// Update Profile
module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { firstname, lastname, email, gender, bio, profileImage } = req.body;
    const userId = req.user._id;

    const updateData = {};
    if (firstname !== undefined) updateData.firstname = firstname;
    if (lastname !== undefined) updateData.lastname = lastname;
    if (email !== undefined) updateData.email = email;
    if (gender !== undefined) updateData.gender = gender;
    if (bio !== undefined) updateData.bio = bio;
    if (profileImage !== undefined) updateData.profileImage = profileImage;

    const user = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    next(err);
  }
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

// Upload Profile Image
module.exports.uploadProfileImage = [
  upload.single('profileImage'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const userId = req.user._id;
      const imagePath = `/uploads/${req.file.filename}`;

      const user = await userModel.findByIdAndUpdate(userId, { profileImage: imagePath }, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Profile image uploaded successfully', user });
    } catch (err) {
      next(err);
    }
  }
];
