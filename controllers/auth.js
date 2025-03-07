const authService = require("../services/auth.service");
const emailService = require("../services/email.service");
const userService = require("../services/user.service");
const { createError } = require("../helpers/error");

const register = async (req, res, next) => {
	try {
		const user = await authService.registerUser(req.body);
		await emailService.sendEmail(user.email, user.verificationToken);
		res.status(201).json({
			name: user.name,
			email: user.email,
			role: user.role,
			id: user._id,
			avatarURL: user.avatarURL,
		});
	} catch (error) {
		next(error);
	}
};

const confirm = async (req, res, next) => {
	try {
		const { verificationToken } = req.params;
		const user = await userService.findUser({ verificationToken });

		if (!user) {
			throw createError(404, "User not found");
		}

		await userService.updateUser(user._id, {
			verify: true,
			verificationToken: null,
		});
		return res.status(200).json({
			code: 200,
			message: "Email was confirmed",
		});
	} catch (e) {
		next(e);
	}
};

const resend = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await userService.findUser({ email });
		if (!user) {
			throw createError(404, "User was not found");
		}
		await emailService.sendEmail(user.email, user.verificationToken);
		return res.status(200).json({
			code: 200,
			message: "check your email",
		});
	} catch (e) {
		next(e);
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
	confirm,
	resend,
	currentUser,
};
