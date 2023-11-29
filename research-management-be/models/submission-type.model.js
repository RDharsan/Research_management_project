const mongoose = require('mongoose');

const SubmissionTypeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	types: {
		type: String,
		required: true,
		default:
			'.docs,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip,.rar,.7z'
	},
	submissionDate: {
		type: Date,
		default: Date.now + 604800000
	},
	description: {
		type: String
	},
	markingScheme: {
		type: String
	}
});

module.exports = mongoose.model('SubmissionType', SubmissionTypeSchema);
