const db = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret, jwtExpiration } = require("../config/jwt");

// Create a new user
const createUser = async (password, email, user_name, user_role) => {
  // Ensure the password meets the requirements
  if (!/^(?=.*\d).{6,}$/.test(password)) {
    throw new Error(
      "Password must have at least one number, and be at least 6 characters long"
    );
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const values = [hashedPassword, email, user_name, user_role];
  try {
    const [results] = await db
      .promise()
      .query(
        "INSERT INTO purrpooddb.Users (password, email, user_name, user_role) VALUES (?, ?, ?, ?)",
        values
      );
    const userId = results.insertId;
    return userId;
  } catch (error) {
    throw error;
  }
};

//login
const loginUser = async (email, password) => {
  try {
    // Retrieve the user's record from the database based on the provided email
    const [userRows] = await db
      .promise()
      .query("SELECT * FROM purrpooddb.Users WHERE email = ?", [email]);

    // Check if a user with the provided email exists
    if (userRows.length === 0) {
      throw new Error("User not found");
    }

    // Retrieve the user's hashed password from the database
    const hashedPassword = userRows[0].password;

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    //get the data in the User's table row 1 (as object to)
    const user = userRows[0];
    // Generate a JWT token
    const token = jwt.sign({ user: user }, jwtSecret, {
      expiresIn: jwtExpiration,
    });
    return token; // Return the JWT token
  } catch (error) {
    throw error;
  }
};

// Fetch all users
const getAllUsers = async () => {
  try {
    const [results] = await db
      .promise()
      .query("SELECT * FROM purrpooddb.Users");

    // Remove the 'password' property from each user object
    const usersWithoutPassword = results.map(({ password, ...user }) => user);
    return usersWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Retrieve a user by ID
const getUserById = async (userId) => {
  try {
    const [results] = await db
      .promise()
      .query("SELECT * FROM purrpooddb.Users WHERE user_id = ?", [userId]);

    if (results.length === 1) {
      // Remove the 'password' property from each user object
      const usersWithoutPassword = results.map(({ password, ...user }) => user);
      return usersWithoutPassword;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

// Update a user by ID
const updateUser = async (userId, newData) => {
  try {
    // Check if the newData object contains a password
    if (newData.password) {
      // Ensure the new password meets the requirements
      if (!/^(?=.*\d).{6,}$/.test(newData.password)) {
        throw new Error(
          "New password must have at least one number, and be at least 6 characters long"
        );
      }
      // Hash the new password
      newData.password = await bcrypt.hash(newData.password, 10);
    }
    const [results] = await db
      .promise()
      .query("UPDATE purrpooddb.Users SET ? WHERE user_id = ?", [
        newData,
        userId,
      ]);

    if (results.affectedRows > 0) {
      return true; // Returns true if the user was updated
    } else {
      throw new Error("User not found or data not modified");
    }
  } catch (error) {
    throw error;
  }
};

// Delete a user by ID
const deleteUser = async (userId) => {
  try {
    const [results] = await db
      .promise()
      .query("DELETE FROM purrpooddb.Users WHERE user_id = ?", [userId]);

    if (results.affectedRows > 0) {
      return true; // Returns true if the user was deleted
    } else {
      throw new Error("User not found or already deleted");
    }
  } catch (error) {
    throw error;
  }
};

// Authenticate a user by username and password and generate a JWT token
// const authenticateUser = async (username, password) => {
//   try {
//     const [results, fields] = await db
//       .promise()
//       .query("SELECT * FROM Users WHERE username = ? AND password = ?", [
//         username,
//         password,
//       ]);

//     if (results.length === 1) {
//       // User found, generate and return a JWT token
//       const user = results[0];
//       const token = jwt.sign(
//         { user_id: user.user_id, username: user.username },
//         process.env.JWT_SECRET
//       );
//       return token;
//     } else {
//       throw new Error(
//         "Authentication failed. User not found or credentials are incorrect"
//       );
//     }
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  loginUser,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  // authenticateUser,
};
