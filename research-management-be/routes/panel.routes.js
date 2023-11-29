const express = require('express');
const {
	getPanels,
	getPanelsByCategory,
	createPanel,
	deletePanel,
	removeStaffMember,
	addStaffMember
} = require('../controllers/panel.controller');

const router = express.Router();
const adminMiddleware = require('../middleware/admin.middleware');

router.post('/', adminMiddleware, createPanel);
router.get('/all', adminMiddleware, getPanels);
router.get('/cat/:category', adminMiddleware, getPanelsByCategory);
router.delete('/delete/:id', adminMiddleware, deletePanel);
router.put('/remove-staff/:id', adminMiddleware, removeStaffMember);
router.put('/add-staff/:id', adminMiddleware, addStaffMember);

module.exports = router;
