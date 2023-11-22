const db = require("../db/db");

const createCartsService = async (customer_id, food_id, quantity) => {
  // Check if the requested quantity is greater than 0
  if (quantity <= 0) {
    throw new Error("Invalid quantity");
  }

  // Check if the food item exists
  const checkPetfood =
    "SELECT stock_quantity FROM purrpooddb.PetFood WHERE food_id = ?";
  const [stockResult] = await db.promise().query(checkPetfood, [food_id]);

  if (stockResult.length === 0) {
    throw new Error("Food item not found");
  }

  const currentStock = stockResult[0].stock_quantity;

  // Check if there is enough stock to fulfill the request
  if (currentStock < quantity) {
    throw new Error("Insufficient stock");
  }

  // Update the stock quantity in the PetFood table
  const updatePetfoodStock =
    "UPDATE purrpooddb.PetFood SET stock_quantity = ? WHERE food_id = ?";
  const updatedStock = currentStock - quantity;

  try {
    await db.promise().query(updatePetfoodStock, [updatedStock, food_id]);
  } catch (updateError) {
    throw updateError;
  }

  // Insert the cart record
  const creatCartQuery =
    "INSERT INTO purrpooddb.Carts (customer_id, food_id, quantity) VALUES (?,?,?)";
  const values = [customer_id, food_id, quantity];
  try {
    const [results] = await db.promise().query(creatCartQuery, values);

    const cartId = results.insertId;
    return cartId;
  } catch (error) {
    // If the cart insertion fails, roll back the stock update
    const rollbackQuery =
      "UPDATE purrpooddb.PetFood SET stock_quantity = ? WHERE food_id = ?";
    await db.promise().query(rollbackQuery, [currentStock, food_id]);

    throw error;
  }
};

const updateCartsQuantityService = async (updatedCarts, cart_id) => {
  const getFoodIdContent = "SELECT stock_quantity FROM purrpooddb.PetFood WHERE food_id = ?";
  const getFoodIdQuery = "SELECT food_id, quantity FROM purrpooddb.Carts WHERE cart_id = ?";
  const updateCartsQuery = "UPDATE purrpooddb.Carts SET quantity = ? WHERE cart_id = ?";
  const updateStockQuery = "UPDATE purrpooddb.PetFood SET stock_quantity = stock_quantity + ? - ? WHERE food_id = ?";

  try {
    const [[cartData]] = await db.promise().query(getFoodIdQuery, [cart_id]);

    if (!cartData) {
      throw new Error("Cart not found");
    }

    const { food_id, quantity } = cartData;

    const stockResult = await db.promise().query(getFoodIdContent, [food_id]);

    // Check if the requested update is valid based on available stock
    const currentStock = stockResult[0].stock_quantity;
    if (currentStock < updatedCarts) {
      throw new Error("Insufficient stock");
    }

    // Update the carts quantity
    await db.promise().query(updateCartsQuery, [updatedCarts, cart_id]);

    // Update the PetFood stock quantity
    await db.promise().query(updateStockQuery, [quantity, updatedCarts, food_id]);

    return true;
  } catch (error) {
    throw error;
  }
};

const getCartsWithPetFoodService = async () => {
  const getCarts =
    "SELECT * FROM purrpooddb.Carts INNER JOIN purrpooddb.Petfood ON Carts.food_id = Petfood.food_id";
  try {
    const [results] = await db.promise().query(getCarts);

    return results;
  } catch (error) {
    throw error;
  }
};

const getUsersWithCartsAndPetFoodService = async () => {
  const getUsersWithCarts =
    "SELECT Users.user_id, Users.user_name, Users.email, Users.user_role, Carts.cart_id, Carts.quantity, Petfood.food_id, Petfood.food_name, Petfood.food_description, Petfood.category, Petfood.price, Petfood.stock_quantity, food_image " +
    "FROM purrpooddb.Users " +
    "LEFT JOIN purrpooddb.Carts ON Users.user_id = Carts.customer_id " +
    "LEFT JOIN purrpooddb.Petfood ON Carts.food_id = Petfood.food_id";

  try {
    const [results] = await db.promise().query(getUsersWithCarts);
    const usersWithCarts = {};

    // Process the query results to structure data
    results.forEach((row) => {
      const {
        user_id,
        user_name,
        email,
        user_role,
        cart_id,
        quantity,
        food_id,
        food_name,
        food_description,
        category,
        price,
        stock_quantity,
        food_image,
      } = row;

      if (!usersWithCarts[user_id]) {
        // If the user is not in the usersWithCarts object, add them
        usersWithCarts[user_id] = {
          user_id,
          user_name,
          email,
          user_role,
          carts: [],
        };
      }

      // Add cart information to the user's carts array
      usersWithCarts[user_id].carts.push({
        cart_id,
        food_id,
        food_name,
        food_description,
        quantity,
        category,
        price,
        stock_quantity,
        food_image,
      });
    });

    // Convert the object values to an array and return
    return Object.values(usersWithCarts);
  } catch (error) {
    throw error;
  }
};

const deleteCartService = async (cart_id) => {
  // Get the cart information before deletion
  const getCartQuery =
    "SELECT food_id, quantity FROM purrpooddb.Carts WHERE cart_id = ?";
  const deleteCartQuery = "DELETE FROM purrpooddb.Carts WHERE cart_id = ?";

  try {
    const [[cartData]] = await db.promise().query(getCartQuery, [cart_id]);

    if (!cartData) {
      throw new Error("Cart not found");
    }

    const { food_id, quantity } = cartData;

    // Delete the cart record
    await db.promise().query(deleteCartQuery, [cart_id]);

    // Restore the stock quantity in the PetFood table
    const restoreStockQuery =
      "UPDATE purrpooddb.PetFood SET stock_quantity = stock_quantity + ? WHERE food_id = ?";
    await db.promise().query(restoreStockQuery, [quantity, food_id]);

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCartsService,
  updateCartsQuantityService,
  getCartsWithPetFoodService,
  getUsersWithCartsAndPetFoodService,
  deleteCartService,
};
