const express = require('express')
const router = express.Router();

const weeklyController = require('../Controller/weeklyController');

router.post('/:username/addPoints',weeklyController.addScore);

module.exports = router;