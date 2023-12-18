const mongoose = require('mongoose');

const the200clubSchema = new mongoose.Schema(
  {
    bio: {
      type: [String],
    },
    pics: {
      type: [String],
    },
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
      required: [true, 'Player must belong to a 200 Club record!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const the200Club = mongoose.model('the200Club', the200clubSchema);

module.exports = the200Club;
