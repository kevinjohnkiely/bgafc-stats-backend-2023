const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const playerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'A Player must have a first name!'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'A Player must have a last name!'],
  },
  slug: {
    type: String,
    slug: ['firstName', 'lastName'],
    slug_padding_size: 1,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  debut: {
    type: String,
    trim: true,
  },
  firstGoal: {
    type: String,
    trim: true,
  },
  honours: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  aTeamApps: {
    type: Number,
    default: 0,
  },
  aTeamGoals: {
    type: Number,
    default: 0,
  },
  bTeamApps: {
    type: Number,
    default: 0,
  },
  bTeamGoals: {
    type: Number,
    default: 0,
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
