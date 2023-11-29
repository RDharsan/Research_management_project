const TemplateSchema = require('../models/template.model');

// create template
const createTemplate = async (req, res, next) => {
	const { name, description, file } = req.body;

	if (!name || !description || !file) {
		return res.status(400).json({
			message: 'name, description and file is required'
		});
	}

	try {
		const template = await TemplateSchema.create({
			name,
			description,
			file
		});
		return res.status(201).json({
			message: 'template created successfully',
			template
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// get all templates
const getAllTemplates = async (req, res, next) => {
	try {
		const templates = await TemplateSchema.find();
		// check length of templates and return 404 if lenght is 0
		if (templates.length === 0) {
			return res.status(404).json({
				message: 'no templates found'
			});
		}
		return res.status(200).json({
			message: 'templates fetched successfully',
			templates
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// delete template
const deleteTemplate = async (req, res, next) => {
	const { id } = req.params;
	try {
		const template = await TemplateSchema.findByIdAndDelete(id);
		if (!template) {
			return res.status(404).json({
				message: 'template not found'
			});
		}
		return res.status(200).json({
			message: 'template deleted successfully',
			template
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//update template
const updateTemplate = async (req, res, next) => {
	const { id } = req.params;
	const { name, description, file } = req.body;
	try {
		// find template by id
		const template = await TemplateSchema.findById(id);
		if (!template) {
			return res.status(404).json({
				message: 'template not found'
			});
		}
		// check if old valuese are same as new values and if not update
		//check name
		if (template.name !== name) {
			template.name = name;
		}
		//check description
		if (template.description !== description) {
			template.description = description;
		}
		//check file
		if (template.file !== file) {
			template.file = file;
		}
		//save template
		await template.save();
		return res.status(200).json({
			message: 'template updated successfully',
			template
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//get template by id
const getTemplateByID = async (req, res, next) => {
	const { id } = req.params;
	try {
		const template = await TemplateSchema.findById(id);
		if (!template) {
			return res.status(404).json({
				message: 'template not found'
			});
		}
		return res.status(200).json({
			message: 'template fetched successfully',
			template
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

exports.createTemplate = createTemplate;
exports.getAllTemplates = getAllTemplates;
exports.deleteTemplate = deleteTemplate;
exports.updateTemplate = updateTemplate;
exports.getTemplateByID = getTemplateByID;
