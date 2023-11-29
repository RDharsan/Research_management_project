const mongoose = require('mongoose');

const StudentGroupSchema = mongoose.Schema({
	sg_id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	students: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	panel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Panel'
	},
	researchTopics: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ResearchTopic'
		}
	],
	acceptedResearchTopic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ResearchTopic'
	}
});

module.exports = mongoose.model('StudentGroup', StudentGroupSchema);
