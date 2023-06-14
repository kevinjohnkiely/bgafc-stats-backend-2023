const mongoose = require('mongoose');
const Player = require('./playerModel');

const seasonSchema = new mongoose.Schema(
  {
    season: {
      type: String,
      required: [true, 'A season must have a season year! e.g 2022/23'],
    },
    team: {
      type: String,
      enum: ['A', 'B'],
      required: [true, 'A team must be either A or B!'],
    },
    division: {
      type: String,
      enum: ['Prem', '1', '2', '2a', '2b', '3', '3a', '3b', '4'],
      required: [true, 'A division must be Prem or from 1 to 4!'],
    },
    lge_apps: {
      type: Number,
      default: 0,
    },
    lge_goals: {
      type: Number,
      default: 0,
    },
    fai_apps: {
      type: Number,
      default: 0,
    },
    fai_goals: {
      type: Number,
      default: 0,
    },
    mjc_apps: {
      type: Number,
      default: 0,
    },
    mjc_goals: {
      type: Number,
      default: 0,
    },
    msc_apps: {
      type: Number,
      default: 0,
    },
    msc_goals: {
      type: Number,
      default: 0,
    },
    desc_apps: {
      type: Number,
      default: 0,
    },
    desc_goals: {
      type: Number,
      default: 0,
    },
    lgec_apps: {
      type: Number,
      default: 0,
    },
    lgec_goals: {
      type: Number,
      default: 0,
    },
    reidyc_apps: {
      type: Number,
      default: 0,
    },
    reidyc_goals: {
      type: Number,
      default: 0,
    },
    hoganc_apps: {
      type: Number,
      default: 0,
    },
    hoganc_goals: {
      type: Number,
      default: 0,
    },
    seasonTotalAppsA: {
      type: Number,
    },
    seasonTotalGoalsA: {
      type: Number,
    },
    seasonTotalAppsB: {
      type: Number,
    },
    seasonTotalGoalsB: {
      type: Number,
    },
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player',
      required: [true, 'Season must belong to a player'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Convulated code to add season totals and player totals in one fell swoop!
seasonSchema.statics.calcPlayerCareerTotals = async function (playerId) {
  const stats = await this.aggregate([
    {
      $match: { player: playerId },
    },
    {
      $group: {
        _id: '$player',
        totalAppsA: { $sum: '$seasonTotalAppsA' },
        totalGoalsA: { $sum: '$seasonTotalGoalsA' },
        totalAppsB: { $sum: '$seasonTotalAppsB' },
        totalGoalsB: { $sum: '$seasonTotalGoalsB' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Player.findByIdAndUpdate(playerId, {
      aTeamApps: stats[0].totalAppsA,
      aTeamGoals: stats[0].totalGoalsA,
      bTeamApps: stats[0].totalAppsB,
      bTeamGoals: stats[0].totalGoalsB,
      totalApps: stats[0].totalAppsA + stats[0].totalAppsB,
      totalGoals: stats[0].totalGoalsA + stats[0].totalGoalsB,
    });
  } else {
    await Player.findByIdAndUpdate(playerId, {
      aTeamApps: 0,
      aTeamGoals: 0,
      bTeamApps: 0,
      bTeamGoals: 0,
    });
  }
};

seasonSchema.pre('save', function (next) {
  if (this.team === 'A') {
    this.seasonTotalAppsA =
      this.lge_apps +
      this.fai_apps +
      this.mjc_apps +
      this.msc_apps +
      this.desc_apps +
      this.lgec_apps +
      this.reidyc_apps +
      this.hoganc_apps;

    this.seasonTotalGoalsA =
      this.lge_goals +
      this.fai_goals +
      this.mjc_goals +
      this.msc_goals +
      this.desc_goals +
      this.lgec_goals +
      this.reidyc_goals +
      this.hoganc_goals;
  } else {
    this.seasonTotalAppsB =
      this.lge_apps +
      this.fai_apps +
      this.mjc_apps +
      this.msc_apps +
      this.desc_apps +
      this.lgec_apps +
      this.reidyc_apps +
      this.hoganc_apps;

    this.seasonTotalGoalsB =
      this.lge_goals +
      this.fai_goals +
      this.mjc_goals +
      this.msc_goals +
      this.desc_goals +
      this.lgec_goals +
      this.reidyc_goals +
      this.hoganc_goals;
  }

  next();
});

seasonSchema.post('save', function () {
  // this points to current season
  this.constructor.calcPlayerCareerTotals(this.player);
});

// findByIdAndUpdate
// findByIdAndDelete
seasonSchema.pre(/^findOneAnd/, async function (next) {
  this.ss = await this.findOne();
  next();
});

seasonSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.ss.constructor.calcPlayerCareerTotals(this.ss.player);
});

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;
