const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth')
const db = require('../models');

router.use(auth);

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const result = await db.User.findAll()
    res.send(result);
});

module.exports = router;