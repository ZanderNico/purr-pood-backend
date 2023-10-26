const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth');
const checkAdminRole = require('../middlewares/adminRole');

// Create user (POST)
router.post('/create-users', userController.createUserController);

//Get all users 
router.get('/', verifyToken, checkAdminRole, userController.getAllUsersController)

//login
router.post('/login', userController.loginUserController)

//get user by id 
router.get('/:user_id', userController.getUserByIdController)

//update user by id
router.put('/update-users/:user_id', userController.updateUserController)

//delete user by id
router.delete('/delete-users/:user_id', userController.deleteUserController)

module.exports = router;