const mongoose = require('mongoose');
const User = require('../models/user.model');

const options = { discriminatorKey: 'kind' };

const Student = User.discriminator(
	'Student',
	new mongoose.Schema(
		{
			studentGroup: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'StudentGroup'
			}
		},
		options
	)
);

module.exports = Student;
