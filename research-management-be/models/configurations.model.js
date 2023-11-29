const mongoose = require('mongoose');

const ConfigurationSchema = mongoose.Schema({
	nextStudentGroupId: {
		type: Number,
		default: 1
	},
	nextPanelId: {
		type: Number,
		default: 1
	}
});

module.exports = mongoose.model('Configuration', ConfigurationSchema);
