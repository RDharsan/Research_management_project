const express = require('express');
const {
	createResearchTopic,
	getResearchTopicsOfStudentGroup,
	requestSupervisor,
	getRequests,
	approveRequest
} = require('../controllers/research-topic.controller');

const authMiddleware = require('../middleware/auth.middleware');
const staffMiddleware = require('../middleware/staff.middleware');
const { runValidation } = require('../validators');
const { topicValidator } = require('../validators/research-topic.validator');
const router = express.Router();

router.post(
	'/',
	topicValidator,
	runValidation,
	authMiddleware,
	createResearchTopic
);

router.get('/group/:id', authMiddleware, getResearchTopicsOfStudentGroup);
router.put('/request/:id', authMiddleware, requestSupervisor);
router.get('/get-requst-by-staff-member', staffMiddleware, getRequests);
router.put('/approve/:id', staffMiddleware, approveRequest);
module.exports = router;
