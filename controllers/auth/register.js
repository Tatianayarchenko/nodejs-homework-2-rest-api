const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');

const { RequestError } = require('../../helpers');

const register = async (req, res) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email is already use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    email,
    subscription,
    password: hashPassword,
  });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
