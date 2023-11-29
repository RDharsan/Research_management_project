const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			default: Date.now
		},
		role: {
			type: String,
			default: 'student'
		}
	},
	{ timestamps: true },
	options
);

module.exports = mongoose.model('User', UserSchema);
