const mongoose = require('mongoose');

const ssSchema = new mongoose.Schema({
  bio: {
    type: [String],
  },
  pics: {
    type: [String],
  },
  player: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player',
    required: [true, 'Player must belong to a Sharpshooter record!'],
  },
});

const Sharpshooter = mongoose.model('Sharpshooter', ssSchema);

module.exports = Sharpshooter;
