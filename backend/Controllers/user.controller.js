// const { validationResult } = require('express-validator');
// const userModel = require('../models/user');
// const userService = require('../service/user.service');

// module.exports.registerUser = async(req, res, next) =>{

//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, fullname, password } = req.body;

//     const isUserAlreadyExists = await userModel.findOne({ email });

//     if(isUserAlreadyExists){
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await userModel.hashPassword(password);

//     const user = await userService.createUser({
//         firstname: fullname.firstname,
//         lastname: fullname.lastname,
//         email,
//         password: hashedPassword
//     });

//     const token = user.generateAuthToken();

//     return res.status(201).json({
//         message: 'User created successfully',
//         user,
//         token
//     });
// }


// module.exports.loginUser = async(req, res, next) =>{

//     const errors = validationResult(req);

//     if(!errors.isEmpty()){
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     const user = await userModel.findOne({email}).select('+password');

//     if(!user){
//         return res.status(401).json({message: 'Invalid email or password'});
//     }

//     const isMatch = await user.comparePasswod(password);

//     if(!isMatch){
//       return res.status(401).json({message : 'Password is Invalid' });
//     }
//     const token = user.generateAuthToken();

//     res.cookie('token', token);

//     return res.status(201).json({
//         message: 'Login successfully',
//         user,
//         token
//     });
// }

// module.exports.getUserProfile = async (req, res, next) => {

//     res.status(200).json(req.user);
// }

// module.exports.logoutUser = async (req, res, next) => {
//     res.clearCookie('token');
//     const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

//     await blackListTokenModel.create({ token });

//     res.status(200).json({ message: 'Logged out' });

// }


const { validationResult } = require('express-validator');
const userModel = require('../models/user');
const userService = require('../service/user.service');
const blackListTokenModel = require('../models/blacklistToken');

// Register user
module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname, password } = req.body;

    // Check if user exists
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password using model method
    const hashedPassword = await userModel.hashPassword(password);

    // Create user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword
    });

    // Generate token
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

// Login user
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

// Get logged-in user profile
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

// Logout user
module.exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (token) {
      await blackListTokenModel.create({ token });
    }

    res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};
