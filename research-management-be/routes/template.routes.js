const express = require('express');
const adminMiddleware = require('../middleware/admin.middleware');

const {
	createTemplate,
	getAllTemplates,
	updateTemplate,
	deleteTemplate,
	getTemplateByID
} = require('../controllers/template.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', adminMiddleware, createTemplate);
router.get('/', authMiddleware, getAllTemplates);
router.put('/update/:id', adminMiddleware, updateTemplate);
router.delete('/delete/:id', adminMiddleware, deleteTemplate);
router.get('/get/:id', authMiddleware, getTemplateByID);

module.exports = router;
