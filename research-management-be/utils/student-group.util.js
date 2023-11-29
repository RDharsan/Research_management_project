const Student = require('../models/student.model');
const StudentGroup = require('../models/student-group.model');

const addStudentToGroup = async (student, group) => {
	try {
		await Student.findByIdAndUpdate(student, {
			studentGroup: group
		});
		const studentGroup = await StudentGroup.findById(group);
		studentGroup.students.push(student);
		await studentGroup.save();
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

const checkIfStudentIsInAGroup = async (studentID) => {
	try {
		const student = await Student.findById(studentID).populate(
			'studentGroup'
		);
		if (student.studentGroup) {
			return { status: true, studentGroup: student.studentGroup };
		}
		//check if any student group has this student
		const student_group = await StudentGroup.find({
			students: { $in: [studentID] }
		});
		if (student_group.length > 0) {
			return { status: true, studentGroup: student_group[0] };
		}
		return { status: false };
	} catch (err) {
		console.log(err);
		return { status: false };
	}
};

exports.addStudentToGroup = addStudentToGroup;
exports.checkIfStudentIsInAGroup = checkIfStudentIsInAGroup;
