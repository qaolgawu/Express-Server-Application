const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
     },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    }
  }, { toJSON: { useProtection: true }, toObject: { useProtection: true } });

  module.exports = mongoose.model('User', userSchema);