const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, PORT, EMAIL_SENDER } = require("../helpers/env");

const BASE_URL = `http://localhost:${PORT}`;

const sendEmail = async (userEmail, code) => {
	sgMail.setApiKey(SENDGRID_API_KEY);
	const link = `${BASE_URL}/auth/verify/${code}`;

	const msg = {
		to: userEmail,
		from: `${EMAIL_SENDER}`,
		subject: "Confirm your email",
		html: `<h4>Click on this link to confirm registration ${link}</h4>`,
	};

	try {
		const result = await sgMail.send(msg);
		console.log("result", result);
	} catch (e) {
		console.log("ERROR", e);
		throw e;
	}
};

module.exports = {
	sendEmail,
};
