const userService = require("../services/users.services.js");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { password, email, user_name, user_role } = req.body;
    const userId = await userService.createUser(
      password,
      email,
      user_name,
      user_role
    );
    return res
      .status(201)
      .json({
        message: "User created successfully",
        input: { password, email, user_name, user_role },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Call the login service
    const token = await userService.loginUser(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Authentication failed" });
  }
}

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Retrieve a user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const userData = await userService.getUserById(userId)
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const newData = req.body;
    const updatedData = await userService.updateUser(userId, newData);

    if (updatedData) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: "User not found or data not modified" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const deletedUser = await userService.deleteUser(userId);

    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found or already deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Authenticate a user and generate a JWT token
const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User();
    const token = await user.authenticateUser(username, password);

    if (token) {
      res.status(200).json({ token });
    } else {
      res
        .status(401)
        .json({
          error:
            "Authentication failed. User not found or credentials are incorrect",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
};
