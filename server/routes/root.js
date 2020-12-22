// #######################################################################
// routes > root.js

const router = require('express').Router();

router.get('/', (req, res) => res.json({ message: 'All working...' }));

module.exports = router;
