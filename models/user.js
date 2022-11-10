const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveErrors } = require('../helpers');

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const userSubscription = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      mutch: emailRegexp,
    },
    subscription: {
      type: String,
      enum: userSubscription,
      default: 'starter',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveErrors);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...userSubscription),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
