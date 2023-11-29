const StudentGroup = require('../models/student-group.model');
const Configurations = require('../models/configurations.model');
const Student = require('../models/student.model');
const { createConfigUtil, pad } = require('../utils/auth.util');
const {
	checkIfStudentIsInAGroup,
	addStudentToGroup
} = require('../utils/student-group.util');
const PanelModel = require('../models/panel.model');

const createStudentGroup = async (req, res, next) => {
	const { name } = req.body;
	const student_id = req.user._id;
	if (!name) {
		return res.status(400).json({
			message: 'Name is required'
		});
	}
	try {
		const is_student_in_a_group = await checkIfStudentIsInAGroup(
			student_id
		);
		if (is_student_in_a_group.status) {
			return res.status(400).json({
				message: 'You are already in a group'
			});
		}
		const conf = await Configurations.findOne();
		if (!conf) {
			const res = await createConfigUtil();
		}
		const configurations = await Configurations.findOne();
		let stg_id = configurations.nextStudentGroupId;

		const studentGroupID = pad(stg_id);

		const studentGroup = new StudentGroup({
			sg_id: studentGroupID,
			name
		});
		await studentGroup.save();

		const has_student_added = await addStudentToGroup(
			student_id,
			studentGroup._id
		);

		configurations.nextStudentGroupId += 1;
		await configurations.save();

		res.status(201).json({
			message: `Student group created successfully ${
				has_student_added
					? 'and you have been added to the group'
					: 'but error while adding you to the group'
			} `,
			studentGroup
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const getStudentGroupOfStudent = async (req, res, next) => {
	const student_id = req.params.id;
	try {
		const studentGroup = await checkIfStudentIsInAGroup(student_id);
		if (studentGroup.status) {
			return res.status(200).json({
				message: 'Student is in a group',
				studentGroup: studentGroup.studentGroup
			});
		}
		return res.status(404).json({
			message: 'Student is not in a group'
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const getStudentsWithoutGroup = async (req, res, next) => {
	try {
		const students = await Student.find({
			studentGroup: { $exists: false },
			role: 'student'
		});
		return res.status(200).json({
			students
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//add student to group
const addStudentToStudentGroup = async (req, res, next) => {
	const { student_id, group_id } = req.body;
	if (!student_id || !group_id) {
		return res.status(400).json({
			message: 'student_id and group_id are required'
		});
	}
	try {
		const student = await Student.findById(student_id);
		if (!student) {
			return res.status(404).json({
				message: 'student not found'
			});
		}
		const group = await StudentGroup.findById(group_id);
		if (!group) {
			return res.status(404).json({
				message: 'group not found'
			});
		}
		const is_student_in_a_group = await checkIfStudentIsInAGroup(
			student_id
		);
		if (is_student_in_a_group.status) {
			return res.status(400).json({
				message: 'User already in a group'
			});
		}

		const has_student_added = await addStudentToGroup(student_id, group_id);
		if (has_student_added) {
			return res.status(200).json({
				message: 'student added to group successfully',
				studentGroup: group
			});
		}
		return res.status(400).json({
			message: 'error while adding student to group'
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//get group by id
const getStudentGroupById = async (req, res, next) => {
	const group_id = req.params.id;
	if (!group_id) {
		return res.status(400).json({
			message: 'group_id is required'
		});
	}
	try {
		const group = await StudentGroup.findById(group_id)
			.populate('students', '-password')
			.populate({
				path: 'researchTopics',
				populate: {
					path: 'category'
				}
			});
		if (!group) {
			return res.status(404).json({
				message: 'group not found'
			});
		}
		return res.status(200).json({
			group
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//get student groups without students
const getStudentGroupsWithLessStudents = async (req, res, next) => {
	try {
		//find student groups that have less than 4 students
		const studentGroups = await StudentGroup.find({
			'students.3': { $exists: false }
		});
		return res.status(200).json({
			studentGroups
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// get all groups
const getAllStudentGroups = async (req, res, next) => {
	try {
		const studentGroups = await StudentGroup.find()
			.populate('students', '-password')
			.populate({
				path: 'researchTopics',
				populate: {
					path: 'category'
				}
			});
		return res.status(200).json({
			studentGroups
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//add panel to group
const addPanelToGroup = async (req, res, next) => {
	const { panel_id, group_id } = req.body;
	if (!panel_id || !group_id) {
		return res.status(400).json({
			message: 'panel_id and group_id are required'
		});
	}
	try {
		const panel = await PanelModel.findById(panel_id);
		if (!panel) {
			return res.status(404).json({
				message: 'panel not found'
			});
		}

		const group = await StudentGroup.findById(group_id);
		if (!group) {
			return res.status(404).json({
				message: 'group not found'
			});
		}
		if (group.panel) {
			return res.status(400).json({
				message: 'group already has a panel'
			});
		}

		group.panel = panel_id;
		await group.save();
		return res.status(200).json({
			message: 'panel added to group successfully'
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'server error', error: err });
	}
};

exports.createStudentGroup = createStudentGroup;
exports.getStudentGroupOfStudent = getStudentGroupOfStudent;
exports.getStudentsWithoutGroup = getStudentsWithoutGroup;
exports.addStudentToStudentGroup = addStudentToStudentGroup;
exports.getStudentGroupById = getStudentGroupById;
exports.getStudentGroupsWithLessStudents = getStudentGroupsWithLessStudents;
exports.getAllStudentGroups = getAllStudentGroups;
exports.addPanelToGroup = addPanelToGroup;
