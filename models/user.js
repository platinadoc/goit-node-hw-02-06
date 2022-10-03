const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar");

const schema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: [true, "Email is required"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			default: function () {
				return gravatar.url(this.email, {}, true);
			},
		},
	},
	{ versionKey: false, timestamps: true }
);

const User = model("user", schema);

const schemaRegister = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string(),
});

const schemaLogin = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

module.exports = {
	User,
	schemaRegister,
	schemaLogin,
};
