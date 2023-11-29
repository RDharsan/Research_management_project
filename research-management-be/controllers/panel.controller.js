const PanelModel = require('../models/panel.model');
const StaffModel = require('../models/staff.model');
const StGroupModle = require('../models/student-group.model');

// create a new panel
const createPanel = async (req, res, next) => {
	const id = req.user._id;
	const { category, staff } = req.body;
	try {
		if (!id || !category || !staff) {
			return res.status(400).json({
				message: 'Missing required fields. (id, category, staff)'
			});
		}
		const panel = new PanelModel({
			category,
			staff,
			createdBy: id
		});
		const staff_members = await getStaff(staff);

		staff_members.forEach(async (member) => {
			if (member.panels) {
				if (member.panels.indexOf(panel._id) === -1) {
					member.panels.push(panel._id);
				}
			} else {
				member.panels = [panel._id];
			}
			await member.save();
		});

		await panel.save();
		return res.status(201).json({
			message: 'Panel created successfully',
			panel
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const getPanels = async (req, res, next) => {
	try {
		const panels = await PanelModel.find()
			.populate('staff')
			.populate('category')
			.populate('createdBy');
		if (panels.length === 0) {
			return res.status(404).json({
				message: 'No panels found'
			});
		}
		return res.status(200).json({
			message: 'Panels retrieved successfully',
			panels
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// get panels by category
const getPanelsByCategory = async (req, res, next) => {
	const { category } = req.params;
	if (!category) {
		return res.status(400).json({
			message: 'Missing required fields. (category)'
		});
	}
	try {
		const panels = await PanelModel.find({ category });
		if (panels.length === 0) {
			return res.status(404).json({
				message: 'No panels found'
			});
		}
		return res.status(200).json({
			message: 'Panels retrieved successfully',
			panels
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// remove staff member from panel
const removeStaffMember = async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			message: 'Missing required fields. (id)'
		});
	}
	try {
		const panel = await PanelModel.findById(id);
		if (!panel) {
			return res.status(404).json({
				message: 'Panel not found'
			});
		}
		const staff_member = await StaffModel.findById(req.body.staff_member);
		if (!staff_member) {
			return res.status(404).json({
				message: 'Staff member not found'
			});
		}
		const index = panel.staff.indexOf(staff_member._id);
		if (index === -1) {
			return res.status(404).json({
				message: 'Staff member not found'
			});
		}
		panel.staff.splice(index, 1);
		await panel.save();

		staff_member.panels.splice(staff_member.panels.indexOf(panel._id), 1);
		await staff_member.save();

		return res.status(200).json({
			message: 'Staff member removed successfully'
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// add staff member to panel
const addStaffMember = async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			message: 'Missing required fields. (id)'
		});
	}

	try {
		const panel = await PanelModel.findById(id);
		if (!panel) {
			return res.status(404).json({
				message: 'Panel not found'
			});
		}
		const staff_member = await StaffModel.findById(req.body.staff_member);
		if (!staff_member) {
			return res.status(404).json({
				message: 'Staff member not found'
			});
		}
		panel.staff.push(staff_member._id);
		await panel.save();

		staff_member.panels.push(panel._id);
		await staff_member.save();

		return res.status(200).json({
			message: 'Staff member added successfully'
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

// delete a panel
const deletePanel = async (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			message: 'Missing required fields. (id)'
		});
	}
	try {
		const panel = await PanelModel.findById(id);
		if (!panel) {
			return res.status(404).json({
				message: 'Panel not found'
			});
		}

		const stGroups = await StGroupModle.find({ panel: panel._id });

		stGroups.forEach(async (group) => {
			// remove panel from group
			group.panel = null;
			await group.save();
		});

		const staff_members = [];
		panel.staff.forEach((member) => {
			const staff_member = StaffModel.findById(member);
			if (!staff_member) {
				return res.status(404).json({
					message: 'Staff member not found'
				});
			}
			staff_members.push(staff_member);
		});

		staff_members.forEach(async (member) => {
			member.panels.splice(member.panels.indexOf(panel._id), 1);
			await member.save();
		});

		await panel.remove();
		return res.status(200).json({
			message: 'Panel deleted successfully'
		});
	} catch (err) {
		return res.status(500).json({ message: 'server error', error: err });
	}
};

const getStaff = async (ids) => {
	const staff = await StaffModel.find({ _id: { $in: ids } });
	return staff;
};
exports.createPanel = createPanel;
exports.getPanels = getPanels;
exports.getPanelsByCategory = getPanelsByCategory;
exports.removeStaffMember = removeStaffMember;
exports.addStaffMember = addStaffMember;
exports.deletePanel = deletePanel;
