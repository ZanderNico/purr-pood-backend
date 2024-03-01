const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth');
const checkAdminRole = require('../middlewares/adminRole');

// Create user (POST)
router.post('/create-users', userController.createUser);

//Get all users 
router.get('/', verifyToken, checkAdminRole, userController.getAllUsers)

//login
router.post('/login', userController.loginUser)

//get user by id 
router.get('/:user_id', verifyToken, userController.getUserById)

//update user by id
router.put('/update-users/:user_id', verifyToken, userController.updateUser)

//delete user by id
router.delete('/delete-users/:user_id', verifyToken, checkAdminRole, userController.deleteUser)

module.exports = router;