const express = require('express');

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.list);
router.get('/:userId', authController.requireSignin, userController.read);
router.put(
  '/:userId',
  authController.requireSignin,
  authController.hasAuthorization,
  userController.update
);
router.delete(
  '/:userId',
  authController.requireSignin,
  authController.hasAuthorization,
  userController.remove
);
router.param('userId', userController.userById);

module.exports = router;
