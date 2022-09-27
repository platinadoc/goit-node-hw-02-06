const authService = require("../services/auth.service");

const register = async (req, res, next) => {
	try {
		const user = await authService.registerUser(req.body);
		res.status(201).json({
			name: user.name,
			email: user.email,
			role: user.role,
			id: user._id,
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const token = await authService.loginUser(req.body);
		res.status(200).json(token);
	} catch (error) {
		next(error);
	}
};

const logout = async (req, res, next) => {
	try {
		await authService.logoutUser(req.user._id);
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

const currentUser = async (req, res, next) => {
	const { email, subscription } = req.user;
	res.status(200).json({
		user: {
			email,
			subscription,
		},
	});
};

module.exports = {
	register,
	login,
	logout,
	currentUser,
};
