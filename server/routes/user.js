const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// api/users
router.post('/', userController.createUser); // Create user
router.get('/', userController.getUsers); // Get all users
router.get('/:id', userController.getSubscribedUsers); // Get subscribed users
router.put('/:id', userController.updateUser); // Update user
router.get('/:id', userController.getUser); // Get user

module.exports = router;