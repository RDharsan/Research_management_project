const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	//Get token from header
	const token = req.headers.authorization;

	//check if no token
	if (!token) {
		return res
			.status(401)
			.json({ message: 'No token, authentication denied' });
	}

	//verify token
	try {
		const decode = jwt.verify(token, 'research');

		req.user = decode.user;
		if (req.user.role != 'admin') {
			return res.status(408).json({
				message: "You don't have access to perform this task"
			});
		}
		next();
	} catch (err) {
		res.status(401).json({ message: 'token is not valid' });
	}
};
