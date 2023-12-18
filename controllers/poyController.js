const catchAsyncErrors = require('../utils/catchAsyncErrors');
const POY = require('../models/poyModel');

exports.getPOY = catchAsyncErrors(async (req, res, next) => {
  const poys = await POY.find().populate('poy_player_info');

  res.status(200).json({
    status: 'success',
    numOfPOY: poys.length,
    data: {
      poys,
    },
  });
});

exports.createPOY = catchAsyncErrors(async (req, res, next) => {
  const newPOY = await POY.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      poy: newPOY,
    },
  });
});

exports.updatePOY = catchAsyncErrors(async (req, res, next) => {
  const poyToUpdate = await POY.findOneAndUpdate(
    { _id: req.params.poyId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!poyToUpdate) {
    return next(
      new AppError('That Player of the Year record does not exist!', 404)
    );
  }

  await poyToUpdate.save();

  res.status(200).json({
    status: 'success',
    data: {
      poy: poyToUpdate,
    },
  });
});

exports.deletePOY = catchAsyncErrors(async (req, res, next) => {
  const poyToDelete = await POY.findOneAndDelete({
    _id: req.params.poyId,
  });

  if (!poyToDelete) {
    return next(
      new AppError('That Player of the Year record does not exist!', 404)
    );
  }

  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

