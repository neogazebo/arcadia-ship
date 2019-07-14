const express = require('express');
const router = express.Router();
const db = require('../models');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const result = await db.User.findAll()
    res.send(result);
});

module.exports = router;