const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/student.model');
const StudentGroup = require('../models/student-group.model');
const Staff = require('../models/staff.model');
const Configurations = require('../models/configurations.model');
const { createConfigUtil } = require('../utils/auth.util');
const { config } = require('dotenv');
const panelModel = require('../models/panel.model');

const register = async (req, res, next) => {
	const { email, password, name, role } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				message: 'User already exists'
			});
		}
		if (role === 'staff') {
			user = new Staff({
				name,
				email,
				password,
				role
			});
		} else {
			user = new Student({
				email,
				password,
				name,
				role
			});
		}
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();

		user.password = undefined;
		const data = {
			user: user,
			role: role,
			createdAt: Date.now()
		};

		jwt.sign(data, 'research', { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			return res.status(200).json({
				token,
				name: user.name,
				id: user.id,
				role: user.role,
				user: user,
				expiresAt: Date.now() + 360000
			});
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				message: 'User does not exist'
			});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({
				message: 'Incorrect password'
			});
		}
		user.password = undefined;
		const data = {
			user: user,
			role: user.role,
			createdAt: Date.now()
		};
		jwt.sign(data, 'research', { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			return res.status(200).json({
				token,
				name: user.name,
				id: user.id,
				role: user.role,
				user: user,
				expiresAt: Date.now() + 360000
			});
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const hydrate = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decoded = jwt.verify(token, 'research');
		const user = await User.findById(decoded.user._id);
		if (!user) {
			return res.status(400).json({
				message: 'User does not exist'
			});
		}
		user.password = undefined;
		const data = {
			user: user,
			role: user.role,
			createdAt: Date.now()
		};
		jwt.sign(data, 'research', { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			return res.status(200).json({
				token,
				name: user.name,
				id: user.id,
				role: user.role,
				user: user,
				expiresAt: Date.now() + 360000
			});
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { id, name, email, role } = req.body;
		const user = await User.findById(id);
		if (!user) {
			return res.status(400).json({
				message: 'User does not exist'
			});
		}
		if (name) user.name = name;
		if (email) user.email = email;
		// if (role) user.role = role;
		await user.save();
		user.password = undefined;
		return res.status(200).json({
			user: user
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const getUsers = async (req, res, next) => {
	try {
		const { role } = req.body;
		if (role) {
			const users = await User.find({ role });
			return res.status(200).json({
				users: users
			});
		}
		const users = await User.find();
		return res.status(200).json({
			users
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const getUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				message: 'User does not exist'
			});
		}
		user.password = undefined;
		return res.status(200).json({
			user: user
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//delete user
const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				message: 'User does not exist'
			});
		}
		// check user role and if student check if there are any student groups
		if (user.role === 'student') {
			const groups = await StudentGroup.find({ students: { $in: [id] } });
			if (groups.length > 0) {
				return res.status(400).json({
					message: 'User is a member of a group'
				});
			}
		}
		// check if user is a staff and if there are any panels
		if (user.role === 'staff') {
			const panels = await panelModel.find({ staff: { $in: [id] } });
			if (panels.length > 0) {
				return res.status(400).json({
					message: 'User is a member of a panel'
				});
			}
		}

		await user.remove();
		return res.status(200).json({
			message: 'User deleted'
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//create configuration
const createConfiguration = async (req, res, next) => {
	const configs = await createConfigUtil();
	if (configs.status) {
		return res.status(201).json({
			message: 'Configuration created',
			configurations: configs.configurations
		});
	} else {
		return res.status(500).json({
			message: 'Configuration not created',
			error: configs.error
		});
	}
};

exports.register = register;
exports.login = login;
exports.hydrate = hydrate;
exports.updateUser = updateUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.createConfiguration = createConfiguration;
