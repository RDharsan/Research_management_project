const { check } = require('express-validator');

const userSignUpValidator = [
	check('name').not().isEmpty().withMessage('Name is required'),
	check('email').isEmail().withMessage('Must be a valid email'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	check('role')
		.isIn(['student', 'staff'])
		.withMessage('Role must be student or staff')
];
exports.userSignUpValidator = userSignUpValidator;

const userLoginValidator = [
	check('email').isEmail().withMessage('Must be a valid email'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long')
];
exports.userLoginValidator = userLoginValidator;
