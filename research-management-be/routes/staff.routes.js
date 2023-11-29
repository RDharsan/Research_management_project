const express = require('express');
const {
	addCategorytoStaffMember,
	getStaffMemberById,
	getAllStaffMembers
} = require('../controllers/staff.controller');
const authMiddleware = require('../middleware/auth.middleware');
const staffMiddleware = require('../middleware/staff.middleware');

const router = express.Router();

router.post(
	'/add-category-to-profile',
	staffMiddleware,
	addCategorytoStaffMember
);
router.get('/all', authMiddleware, getAllStaffMembers);
router.get('/find/:id', authMiddleware, getStaffMemberById);

module.exports = router;
