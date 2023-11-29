const Category = require('../models/category.model');
const Staff = require('../models/staff.model');

const addCategorytoStaffMember = async (req, res, next) => {
	const { category_id } = req.body;
	const id = req.user.id;
	if (!category_id && !id) {
		return res.status(400).json({
			message: 'category_id and id is required'
		});
	}
	try {
		const category = await Category.findById(category_id);
		if (!category) {
			return res.status(404).json({
				message: 'category not found'
			});
		}

		const staffMember = await Staff.findById(req.user._id).select(
			'-password'
		);
		if (!staffMember) {
			return res.status(404).json({
				message: 'staff member not found'
			});
		}
		const is_category_already_added = staffMember.categories.find(
			(category) => category._id == category_id
		);

		if (is_category_already_added) {
			return res.status(400).json({
				message: 'category already added'
			});
		}

		staffMember.categories.push(category_id);
		await staffMember.save();
		return res.status(201).json({
			message: 'category added successfully',
			staffMember
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//get staff member by id
const getStaffMemberById = async (req, res, next) => {
	try {
		const staffMember = await Staff.findById(req.params.id)
			.select('-password')
			.populate('categories');
		if (!staffMember) {
			return res.status(404).json({
				message: 'staff member not found'
			});
		}
		return res.status(200).json({
			staffMember
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// get staff members by category
const getStaffMembersByCategory = async (req, res, next) => {
	try {
		const staffMembers = await Staff.find({
			categories: { $in: [req.params.id] }
		});
		if (!staffMembers) {
			return res.status(404).json({
				message: 'staff members not found'
			});
		}
		return res.status(200).json({
			staffMembers
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

//get all staff members
const getAllStaffMembers = async (req, res, next) => {
	try {
		const staffMembers = await Staff.find()
			.select('-password')
			.populate('categories');
		if (!staffMembers) {
			return res.status(404).json({
				message: 'staff members not found'
			});
		}
		return res.status(200).json({
			staffMembers
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

exports.addCategorytoStaffMember = addCategorytoStaffMember;
exports.getStaffMemberById = getStaffMemberById;
exports.getStaffMembersByCategory = getStaffMembersByCategory;
exports.getAllStaffMembers = getAllStaffMembers;
