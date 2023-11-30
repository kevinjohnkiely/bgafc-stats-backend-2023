require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const Player = require('../models/playerModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const AppError = require('../utils/errorHandling/appError');

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Log the configuration
// console.log(cloudinary.config());

exports.getAllPlayers = catchAsyncErrors(async (req, res, next) => {
  let players;
  if (req.query.sort) {
    players = await Player.find().sort(req.query.sort);
  } else {
    players = await Player.find().sort({ lastName: 1 });
  }

  res.status(200).json({
    status: 'success',
    numOfPlayers: players.length,
    data: {
      players,
    },
  });
});

// exports.getPlayersWithHattricks = catchAsyncErrors(async (req, res, next) => {
//   const players = await Player.find().populate('hattricks');

//   const playersRes = players.filter(player => player.hattricks.length !== 0); 

//   res.status(200).json({
//     status: 'success',
//     numOfPlayers: playersRes.length,
//     data: {
//       playersRes,
//     },
//   });
// });

exports.getOnePlayer = catchAsyncErrors(async (req, res, next) => {
  const player = await Player.findOne({ slug: req.params.playerSlug }).populate(
    'seasons'
  );

  if (!player) {
    return next(new AppError('That Player does not exist!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      player: player,
    },
  });
});

exports.createPlayer = catchAsyncErrors(async (req, res, next) => {
  const newPlayer = await Player.create(req.body);

  if (!newPlayer) {
    return next(
      new AppError('Error creating new player, please try again later!', 404)
    );
  }

  res.status(201).json({
    status: 'success',
    data: {
      player: newPlayer,
    },
  });
});

exports.updatePlayer = catchAsyncErrors(async (req, res, next) => {
  const playerToUpdate = await Player.findOneAndUpdate(
    { slug: req.params.playerSlug },
    req.body,
    { new: true, runValidators: true }
  );

  if (!playerToUpdate) {
    return next(new AppError('That Player does not exist!', 404));
  }

  await playerToUpdate.save();

  res.status(200).json({
    status: 'success',
    data: {
      player: playerToUpdate,
    },
  });
});

exports.deletePlayer = catchAsyncErrors(async (req, res, next) => {
  const playerToDelete = await Player.findOneAndDelete({
    slug: req.params.playerSlug,
  });

  if (!playerToDelete) {
    return next(new AppError('That Player does not exist!', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

exports.uploadPhoto = catchAsyncErrors(async (req, res, next) => {
  const fileStr = req.body.data;
  const { fileName } = req.body;
  const options = {
    public_id: fileName,
    folder: 'bgafc_stats',
  };
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, options);

  req.body = {
    image: uploadedResponse.url,
  };
  // Update the player with new image URL
  const playerToUpdate = await Player.findOneAndUpdate(
    { slug: req.params.playerSlug },
    req.body,
    { new: true, runValidators: true }
  );

  if (!playerToUpdate) {
    return next(new AppError('That Player does not exist!', 404));
  }

  await playerToUpdate.save();

  res.status(200).json({
    status: 'success',
    data: {
      player: playerToUpdate,
    },
  });
});
