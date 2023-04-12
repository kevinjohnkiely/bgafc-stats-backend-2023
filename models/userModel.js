const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, minlength: 8, required: true, select: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
