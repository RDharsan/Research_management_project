const express = require('express');
const studentMiddleware = require('../middleware/student.middleware');
const {
	createSubmission,
	getSubmissionBySubmissionTypeId,
	deleteSubmission,
	evaluateSubmission,
	getSubmissionsForEvaluation,
	getEvaluatedSubmissionsForPanleIds,
	getSubmissionsForStudentGroup
} = require('../controllers/submission.controller');
const staffMiddleware = require('../middleware/staff.middleware');
const router = express.Router();

router.post('/', studentMiddleware, createSubmission);
router.get(
	'/get/:sub_type_id/:st_id',
	studentMiddleware,
	getSubmissionBySubmissionTypeId
);
router.delete(
	'/delete/:sub_type_id/:st_id',
	studentMiddleware,
	deleteSubmission
);

router.put('/evaluate/:sub_id', staffMiddleware, evaluateSubmission);
router.post(
	'/get-submissions-to-evaluate',
	staffMiddleware,
	getSubmissionsForEvaluation
);
router.post(
	'/get-evaluated-for-panel',
	staffMiddleware,
	getEvaluatedSubmissionsForPanleIds
);

router.get(
	'/student-group/:st_id',
	studentMiddleware,
	getSubmissionsForStudentGroup
);

module.exports = router;
