const express = require('express');
const {
	createStudentGroup,
	getStudentGroupOfStudent,
	getStudentsWithoutGroup,
	addStudentToStudentGroup,
	getStudentGroupById,
	getStudentGroupsWithLessStudents,
	getAllStudentGroups,
	addPanelToGroup
} = require('../controllers/student-group.controller');
const adminMiddleware = require('../middleware/admin.middleware');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

const studentMiddleware = require('../middleware/student.middleware');

router.post('/', studentMiddleware, createStudentGroup);
router.get(
	'/joinable-groups',
	authMiddleware,
	getStudentGroupsWithLessStudents
);
router.get('/group/:id', authMiddleware, getStudentGroupById);
router.post('/add-to-group', studentMiddleware, addStudentToStudentGroup);
router.get('/student/:id', authMiddleware, getStudentGroupOfStudent);
router.get('/ng-students', authMiddleware, getStudentsWithoutGroup);
router.get('/all-groups', authMiddleware, getAllStudentGroups);
router.put('/add-panel', adminMiddleware, addPanelToGroup);

module.exports = router;
