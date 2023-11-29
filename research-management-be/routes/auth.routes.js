const express = require('express');

const router = express.Router();
const {
	register,
	login,
	hydrate,
	updateUser,
	getUsers,
	getUser,
	deleteUser,
	createConfiguration
} = require('../controllers/auth.controller');
const adminMiddleware = require('../middleware/admin.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const {
	userLoginValidator,
	userSignUpValidator
} = require('../validators/auth.validator');
const { runValidation } = require('../validators/index');

router.post('/signup', userSignUpValidator, runValidation, register);

router.post('/login', userLoginValidator, runValidation, login);
router.post('/hydrate', hydrate);
router.put('/updateuser', adminMiddleware, updateUser);
router.get('/users', adminMiddleware, getUsers);
router.get('/user/:id', authMiddleware, getUser);
router.delete('/user/:id', adminMiddleware, deleteUser);
router.post('/configuration', createConfiguration);

module.exports = router;
