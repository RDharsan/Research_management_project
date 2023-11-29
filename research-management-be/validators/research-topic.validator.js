const { check } = require('express-validator');

const topicValidator = [
	check('topic')
		.isLength({ min: 30 })
		.withMessage('Topic must be at least 30 characters long'),
	check('description')
		.isLength({ min: 100 })
		.withMessage('Description must be at least 100 characters long')
];
exports.topicValidator = topicValidator;
