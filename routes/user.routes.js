const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.list);
router.get('/:userId', userController.read);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.remove);
router.param('userId', userController.userById);

module.exports = router;
