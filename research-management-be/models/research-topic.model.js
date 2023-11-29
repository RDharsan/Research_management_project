const mongoose = require('mongoose');

const ResearchTopicSchema = mongoose.Schema({
	studentGroup: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'StudentGroup'
	},
	topic: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	isApproved: {
		type: Boolean,
		default: false
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	approvedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	supervisor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	coSupervisor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	supervisorRequests: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	coSupervisorRequests: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
});

module.exports = mongoose.model('ResearchTopic', ResearchTopicSchema);
