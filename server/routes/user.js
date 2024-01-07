const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// api/users
router.post('/', userController.createUser); // Create user
router.get('/', userController.getUsers); // Get all users
router.put('/:id', userController.updateUser); // Update user
router.get('/:id', userController.getUser); // Get user
router.delete('/:id', userController.deleteUser); // Delete user

module.exports = router;