const mongoose = require('mongoose');
const User = require('../models/user.model');

const options = { discriminatorKey: 'kind' };

const Staff = User.discriminator(
	'Staff',
	new mongoose.Schema(
		{
			panels: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Panel'
				}
			],
			categories: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Category'
				}
			],
			subRole: {
				type: String
			}
		},
		options
	)
);

module.exports = Staff;
