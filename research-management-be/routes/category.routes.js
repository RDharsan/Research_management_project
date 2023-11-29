const express = require('express');
const {
	createCategory,
	getCategories
} = require('../controllers/category.controller');
const adminMiddleware = require('../middleware/admin.middleware');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', adminMiddleware, createCategory);
router.get('/', authMiddleware, getCategories);

module.exports = router;
