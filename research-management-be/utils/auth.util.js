const jwt = require('jsonwebtoken');
const configurationsModel = require('../models/configurations.model');

const createToken = (data) => {
	let token;
	try {
		jwt.sign(data, 'research', { expiresIn: 360000 }, (err, tkn) => {
			if (!err) {
				token = tkn;
			} else {
				console.log(err);
			}
		});
		if (token) {
			return { status: true, token: token };
		}
	} catch (error) {
		console.log('error');
		console.log(error);
		return { status: false, error: 'catch' };
	}
	if (token) {
		return { status: true, token: token };
	}
	return { status: false, error: 'err' };
};

const createConfigUtil = async () => {
	try {
		const configurations = new configurationsModel({
			nextStudentGroupId: 1,
			nextStaffId: 1
		});
		await configurations.save();
		return { status: true, configurations };
	} catch (err) {
		console.log(err);
		return { status: false };
	}
};

const pad = (num, size = 4, prefix = 'SG') => {
	num = num.toString();
	while (num.length < size) num = '0' + num;
	return prefix + num;
};

exports.createToken = createToken;
exports.createConfigUtil = createConfigUtil;
exports.pad = pad;
