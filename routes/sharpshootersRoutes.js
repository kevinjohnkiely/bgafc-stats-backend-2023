const express = require('express');
const { getSharpShooters } = require('../controllers/sharpshootersController');

const router = express.Router({ mergeParams: true });
router.route('/').get(getSharpShooters);

module.exports = router;
