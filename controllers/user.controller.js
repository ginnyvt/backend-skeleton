const extend = require('lodash/extend');
const { getErrorMessage } = require('../helpers/dbErrorHandler');

const User = require('../models/user.model');

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.status(200).json({
      message: 'User created successfully!',
      user,
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email updatedAt createdAt');
    return res
      .status(200)
      .json({ message: 'Users retrieved successfully!', users });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: 'User not found!',
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user!',
    });
  }
};

const read = async (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json({
    message: 'User retrieved successfully!',
    user: req.profile,
  });
};

const update = async (req, res) => {
  try {
    const user = req.profile;
    user = extend(user, req.body);
    user.updatedAt = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.status(200).json({
      message: 'User updated successfully!',
      user,
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    const user = req.profile;
    const deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    return res.status(200).json({
      message: 'User deleted successfully!',
      deletedUser,
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

module.exports = { create, read, list, update, remove, userById };
