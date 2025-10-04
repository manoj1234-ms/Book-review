const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  username: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  phoneNumber: { type: String, trim: true },
  birthDate: { type: Date },
  gender: { type: String, trim: true },
  bio: { type: String, trim: true },
  profileImage: { type: String, default: '' },
  purchaseLimit: { type: Number, default: 10 }
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
  next();
});

// Static method to hash password manually
userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
};

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

const User = mongoose.model('User', userSchema);
module.exports = User;
