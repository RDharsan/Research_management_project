const SubmissionTypeModel = require('../models/submission-type.model');
const SubmissionModel = require('../models/submission.model');

const addSubmissionType = async (req, res, next) => {
	const { name, types, submissionDate, description, markingScheme } =
		req.body;
	if (!name || !types || !submissionDate || !description || !markingScheme) {
		return res.status(400).json({
			message:
				'Missing required fields. (name, description, submissionDate, types, markingScheme)'
		});
	}

	try {
		const submissionType = new SubmissionTypeModel({
			name,
			types,
			submissionDate,
			description,
			markingScheme
		});
		await submissionType.save();
		return res.status(201).json({
			message: 'Submission type added successfully',
			submissionType
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const getSubmissionTypes = async (req, res, next) => {
	try {
		const submissionTypes = await SubmissionTypeModel.find();
		if (submissionTypes.length === 0) {
			return res.status(404).json({
				message: 'No submission types found'
			});
		}
		return res.status(200).json({
			message: 'Submission types retrieved successfully',
			submissionTypes
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const deleteSubmissionType = async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			message: 'Missing required fields. (id)'
		});
	}

	try {
		const submissionType = await SubmissionTypeModel.findById(id);
		if (!submissionType) {
			return res.status(404).json({
				message: 'Submission type not found'
			});
		}
		const submissions = await SubmissionModel.find({ submissionType: id });
		if (submissions.length > 0) {
			return res.status(400).json({
				message: 'Submission type is in use'
			});
		}
		await SubmissionTypeModel.deleteOne({ _id: id });
		return res.status(200).json({
			message: 'Submission type deleted successfully'
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const updateSubmissionType = async (req, res, next) => {
	const { id } = req.params;
	const { name, types, submissionDate, description } = req.body;
	if (!id) {
		return res.status(400).json({
			message: 'Missing required fields. (id)'
		});
	}

	try {
		const submissionType = await SubmissionTypeModel.findById(id);
		if (!submissionType) {
			return res.status(404).json({
				message: 'Submission type not found'
			});
		}
		if (name !== submissionType.name) submissionType.name = name;
		if (types !== submissionType.types) submissionType.types = types;
		if (submissionDate !== submissionType.submissionDate)
			submissionType.submissionDate = submissionDate;
		if (description !== submissionType.description)
			submissionType.description = description;
		await submissionType.save();

		return res.status(200).json({
			message: 'Submission type updated successfully',
			submissionType
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//get submission type by id
const getSubmissionTypeById = async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			message: 'Missing required fields. (id)'
		});
	}

	try {
		const submissionType = await SubmissionTypeModel.findById(id);
		if (!submissionType) {
			return res.status(404).json({
				message: 'Submission type not found'
			});
		}
		return res.status(200).json({
			message: 'Submission type retrieved successfully',
			submissionType
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

exports.addSubmissionType = addSubmissionType;
exports.getSubmissionTypes = getSubmissionTypes;
exports.deleteSubmissionType = deleteSubmissionType;
exports.updateSubmissionType = updateSubmissionType;
exports.getSubmissionTypeById = getSubmissionTypeById;
