const SubmissionSchema = require('../models/submission.model');
const SubmissionTypeSchema = require('../models/submission-type.model');
const StudentGroupSchema = require('../models/student-group.model');

// create submission
const createSubmission = async (req, res, next) => {
	const { submissionType, studentGroup, files } = req.body;
	try {
		const submissionTypeObj = await SubmissionTypeSchema.findById(
			submissionType
		);
		const studentGroupObj = await StudentGroupSchema.findById(studentGroup);
		if (!submissionTypeObj || !studentGroupObj) {
			return res.status(404).json({
				message: 'submission type or student group not found'
			});
		}
		// check if submission is already created for this student group
		const submission = await SubmissionSchema.findOne({
			studentGroup: studentGroupObj._id,
			submissionType: submissionTypeObj._id
		});

		if (submission) {
			return res.status(409).json({
				message: 'submission already created for this student group'
			});
		}
		const newSubmission = await SubmissionSchema.create({
			submissionType: submissionTypeObj._id,
			studentGroup: studentGroupObj._id,
			files
		});
		return res.status(201).json({
			message: 'submission created successfully',
			submission: newSubmission
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// get submission by submission type id
const getSubmissionBySubmissionTypeId = async (req, res, next) => {
	const { sub_type_id, st_id } = req.params;
	try {
		const submissionTypeObj = await SubmissionTypeSchema.findById(
			sub_type_id
		);
		if (!submissionTypeObj) {
			return res.status(404).json({
				message: 'submission type not found'
			});
		}
		const submission = await SubmissionSchema.find({
			submissionType: submissionTypeObj._id,
			studentGroup: st_id
		});

		return res.status(200).json({
			message: 'submission fetched successfully',
			submissionType: submissionTypeObj,
			submission: submission.length > 0 ? submission[0] : {}
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// delete submission
const deleteSubmission = async (req, res, next) => {
	const { sub_type_id, st_id } = req.params;
	try {
		// find submission by submission type id and student group id
		const submission = await SubmissionSchema.findOne({
			submissionType: sub_type_id,
			studentGroup: st_id
		});
		if (!submission) {
			return res.status(404).json({
				message: 'submission not found'
			});
		}
		const deletedSubmission = await SubmissionSchema.findByIdAndDelete(
			submission._id
		);
		return res.status(200).json({
			message: 'submission deleted successfully',
			submission: deletedSubmission
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// evaluate submission
const evaluateSubmission = async (req, res, next) => {
	const { sub_id } = req.params;
	const { marks, comment } = req.body;
	try {
		const submission = await SubmissionSchema.findById(sub_id);
		if (!submission) {
			return res.status(404).json({
				message: 'submission not found'
			});
		}
		submission.marks = marks;
		submission.comment = comment;
		submission.isEvaluated = true;
		submission.evaluatedBy = req.user._id;

		const updatedSubmission = await submission.save();
		return res.status(200).json({
			message: 'submission evaluated successfully',
			submission: updatedSubmission
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// get submissions for list of panels of a staff member to evaluate
const getSubmissionsForEvaluation = async (req, res, next) => {
	const { panel_ids } = req.body;
	try {
		// get student groups for each panel
		const studentGroups = await StudentGroupSchema.find({
			panel: { $in: panel_ids }
		});
		// get submissions for each student group
		const submissions = await SubmissionSchema.find({
			studentGroup: { $in: studentGroups.map((sg) => sg._id) },
			isEvaluated: false
		})
			.populate('studentGroup')
			.populate('submissionType');
		return res.status(200).json({
			message: 'submissions fetched successfully',
			submissions
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const getEvaluatedSubmissionsForPanleIds = async (req, res, next) => {
	const { panel_ids } = req.body;
	try {
		// get student groups for each panel
		const studentGroups = await StudentGroupSchema.find({
			panel: { $in: panel_ids }
		});
		// get submissions for each student group
		const submissions = await SubmissionSchema.find({
			studentGroup: { $in: studentGroups.map((sg) => sg._id) },
			isEvaluated: true
		})
			.populate('studentGroup')
			.populate('submissionType');
		return res.status(200).json({
			message: 'submissions fetched successfully',
			submissions
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//get submissions for a student group
const getSubmissionsForStudentGroup = async (req, res, next) => {
	const { st_id } = req.params;
	try {
		const submissions = await SubmissionSchema.find({
			studentGroup: st_id
		})
			.populate('studentGroup')
			.populate('submissionType');
		return res.status(200).json({
			message: 'submissions fetched successfully',
			submissions
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// export functions
exports.createSubmission = createSubmission;
exports.getSubmissionBySubmissionTypeId = getSubmissionBySubmissionTypeId;
exports.deleteSubmission = deleteSubmission;
exports.evaluateSubmission = evaluateSubmission;
exports.getSubmissionsForEvaluation = getSubmissionsForEvaluation;
exports.getEvaluatedSubmissionsForPanleIds = getEvaluatedSubmissionsForPanleIds;
exports.getSubmissionsForStudentGroup = getSubmissionsForStudentGroup;
