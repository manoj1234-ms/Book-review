const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const blackListTokenModel = require('../models/blacklistToken');


module.exports.authUser = async (req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isblackListed = await blackListTokenModel.findOne({ token });

        if (isblackListed) {
            return res.status(401).json({ message: 'Token is invalid (logged out)' });
        }

        //verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;

        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
