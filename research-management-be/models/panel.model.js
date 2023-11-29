const mongoose = require('mongoose');

const PanelSchema = mongoose.Schema({
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	staff: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Panel', PanelSchema);
