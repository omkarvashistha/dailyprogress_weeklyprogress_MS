const express = require('express')
const router = express.Router();
const cors = require('cors');

router.use(cors());

const weeklyController = require('../Controller/weeklyController');

router.post('/:username/addPoints',weeklyController.addScore);
router.all('*',weeklyController.invalid);

module.exports = router;