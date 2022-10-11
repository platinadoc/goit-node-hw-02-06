const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			require: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const schemaAdd = Joi.object({
	name: Joi.string().min(2).max(20).required(),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^[0-9]+$/)
		.required(),
	favorite: Joi.bool(),
});

const schemaUpdate = Joi.object({
	name: Joi.string().min(2).max(20),
	email: Joi.string().email(),
	phone: Joi.string().pattern(/^[0-9]+$/),
	favorite: Joi.bool(),
}).min(1);

const schemaUpdateFavorite = Joi.object({
	favorite: Joi.bool().required(),
});

module.exports = {
	Contact,
	schemaAdd,
	schemaUpdate,
	schemaUpdateFavorite,
};
