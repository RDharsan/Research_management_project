const express = require('express');
const { getSigendURL } = require('../controllers/aws.controller');

const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

router.get('/signed', authMiddleware, getSigendURL);

module.exports = router;
