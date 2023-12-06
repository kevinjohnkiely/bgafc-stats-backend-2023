const mongoose = require('mongoose');

const ssSchema = new mongoose.Schema({
  bio: {
    type: [String],
  },
  pics: {
    type: [String],
  },
});

const Sharpshooter = mongoose.model('Sharpshooter', ssSchema);

module.exports = Sharpshooter;
