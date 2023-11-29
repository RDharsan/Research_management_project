const express = require('express');

const router = express.Router();

const {
	addSubmissionType,
	getSubmissionTypes,
	deleteSubmissionType,
	updateSubmissionType,
	getSubmissionTypeById
} = require('../controllers/submission-type.controller');
const adminMiddleware = require('../middleware/admin.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', adminMiddleware, addSubmissionType);
router.get('/all', authMiddleware, getSubmissionTypes);
router.delete('/delete/:id', adminMiddleware, deleteSubmissionType);
router.put('/update/:id', adminMiddleware, updateSubmissionType);
router.get('/get/:id', authMiddleware, getSubmissionTypeById);

module.exports = router;
