// routes for user
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// api/users
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;