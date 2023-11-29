const mongoose = require('mongoose');

const SubmissionSchema = mongoose.Schema({
	submissionType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SubmissionType'
	},
	studentGroup: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'StudentGroup'
	},
	date: {
		type: Date,
		default: Date.now
	},
	files: [
		{
			type: String,
			required: true
		}
	],
	isEvaluated: {
		type: Boolean,
		default: false
	},
	marks: {
		type: Number,
		default: 0
	},
	comment: {
		type: String
	},
	evaluatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Submission', SubmissionSchema);
