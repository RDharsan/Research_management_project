const Category = require('../models/category.model');
const ResearchTopic = require('../models/research-topic.model');
const StudentGroup = require('../models/student-group.model');
const User = require('../models/user.model');
const { sendMail } = require('../utils/mail.util');

const createResearchTopic = async (req, res, next) => {
	const { studentGroup, topic, description, category } = req.body;
	if (!studentGroup || !category) {
		return res.status(400).json({
			message: 'studentGroup and category are required'
		});
	}

	try {
		const student_group = await StudentGroup.findById(studentGroup);
		if (!student_group) {
			return res.status(404).json({
				message: 'student group not found'
			});
		}
		const isCategoryAvailable = await Category.findById(category);
		if (!isCategoryAvailable) {
			return res.status(404).json({
				message: 'category not found'
			});
		}

		const researchTopic = new ResearchTopic({
			studentGroup,
			topic,
			description,
			category
		});
		await researchTopic.save();

		student_group.researchTopics.push(researchTopic._id);
		await student_group.save();

		return res.status(201).json({
			message: 'Research topic created successfully',
			researchTopic
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const getResearchTopicsOfStudentGroup = async (req, res, next) => {
	const { id } = req.params;
	try {
		const studentGroup = await StudentGroup.findById(id);
		if (!studentGroup) {
			return res.status(404).json({
				message: 'student group not found'
			});
		}
		const researchTopics = await ResearchTopic.find({
			studentGroup: id
		}).populate([
			'category',
			'supervisor',
			'coSupervisor',
			'approvedBy',
			'supervisorRequests',
			'coSupervisorRequests'
		]);

		if (researchTopics.length === 0) {
			return res.status(404).json({
				message: 'no research topics found'
			});
		}
		return res.status(200).json({
			message: 'research topics found',
			researchTopics
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// request supervisor or co-supervisor
const requestSupervisor = async (req, res, next) => {
	const { id } = req.params;
	const { email, message, type } = req.body;
	if (!email || !message || !type) {
		return res.status(400).json({
			message: 'email, message and type are required'
		});
	}
	try {
		const researchTopic = await ResearchTopic.findById(id);
		if (!researchTopic) {
			return res.status(404).json({
				message: 'research topic not found'
			});
		}

		//check if staff user exists for the email provided
		const staffUser = await User.findOne({ email });
		if (!staffUser) {
			return res.status(404).json({
				message: 'staff user not found'
			});
		}

		//check if request already exists
		if (type === 'supervisor') {
			if (researchTopic.supervisorRequests.includes(staffUser._id)) {
				return res.status(400).json({
					message: 'request already exists'
				});
			}
			if (researchTopic.supervisorRequests.length >= 2) {
				return res.status(400).json({
					message: 'maximum number of requests reached'
				});
			}
			researchTopic.supervisorRequests.push(staffUser._id);
		} else if (type === 'co-supervisor') {
			if (researchTopic.coSupervisorRequests.includes(staffUser._id)) {
				return res.status(400).json({
					message: 'request already exists'
				});
			}
			if (researchTopic.coSupervisorRequests.length >= 2) {
				return res.status(400).json({
					message: 'maximum number of requests reached'
				});
			}
			researchTopic.coSupervisorRequests.push(staffUser._id);
		}
		const full_message = `New Research group has requested ${type} for your approval. Visit the portal to approve or reject the request.\n ${message}`;
		await sendMail(email, `Request for ${type}`, full_message);
		await researchTopic.save();

		return res.status(200).json({
			message: 'request sent successfully',
			user: staffUser
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// get all requests for supervisor and co-supervisor
const getRequests = async (req, res, next) => {
	const id = req.user._id;
	console.log(id);
	try {
		// check if any research topic supervisor requests exist for the id
		const supervisor_requests = await ResearchTopic.find({
			supervisorRequests: { $in: [id] }
		}).populate('category');
		const co_supervisor_requests = await ResearchTopic.find({
			coSupervisorRequests: { $in: [id] }
		}).populate('category');
		if (
			supervisor_requests.length === 0 &&
			co_supervisor_requests.length === 0
		) {
			return res.status(404).json({
				message: 'no requests found'
			});
		}
		return res.status(200).json({
			message: 'requests found',
			supervisor_requests,
			co_supervisor_requests
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};
// todo - add group id and mark the accepted research topic
const approveRequest = async (req, res, next) => {
	const { id } = req.params;
	const { type } = req.body;

	console.log('HERE');
	if (!type) {
		return res.status(400).json({
			message: 'type is required'
		});
	}
	try {
		const researchTopic = await ResearchTopic.findById(id);
		if (!researchTopic) {
			return res.status(404).json({
				message: 'research topic not found'
			});
		}
		if (type === 'supervisor') {
			// clear the supervisor requests
			researchTopic.supervisorRequests = [];
			// add the supervisor to the research topic
			researchTopic.supervisor = req.user._id;
			researchTopic.isApproved = true;
			researchTopic.approvedBy = req.user._id;
			console.log(researchTopic);
			const studentGroup = await StudentGroup.findById(
				researchTopic.studentGroup
			);

			// console.log(studentGroup);
			studentGroup.acceptedResearchTopic = researchTopic._id;
			// remove other research topics from the student group
			studentGroup.researchTopics = studentGroup.researchTopics.filter(
				(researchTopic) => researchTopic !== id
			);
			await studentGroup.save();
		} else if (type === 'co-supervisor') {
			// clear the co-supervisor requests
			researchTopic.coSupervisorRequests = [];
			// add the co-supervisor to the research topic
			researchTopic.coSupervisor = req.user._id;
		}
		await researchTopic.save();

		return res.status(200).json({
			message: 'request approved successfully'
		});
	} catch (err) {
		console.log('err');
		console.log(err);
		return res.status(500).json({ message: 'server error', error: err });
	}
};

exports.createResearchTopic = createResearchTopic;
exports.getResearchTopicsOfStudentGroup = getResearchTopicsOfStudentGroup;
exports.requestSupervisor = requestSupervisor;
exports.getRequests = getRequests;
exports.approveRequest = approveRequest;
