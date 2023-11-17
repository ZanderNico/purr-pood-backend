const db = require("../db/db");

const createCartsService = async (customer_id, food_id, quantity) => {
  const query =
    "INSERT INTO purrpooddb.Carts (customer_id, food_id, quantity) VALUES (?,?,?)";
  const values = [customer_id, food_id, quantity];
  try {
    const [results] = await db.promise().query(query, values);

    const cartId = results.insertId;
    return cartId;
  } catch (error) {
    throw error;
  }
};

const updateCartsQuantityService = async (updatedCarts, cartId) => {
  const update = "UPDATE purrpooddb.Carts SET quantity = ? WHERE cart_id = ?";
  const values = [updatedCarts, cartId];
  try {
    const [results] = await db.promise().query(update, values);

    if (results.affectedRows > 0) {
      return true;
    } else {
      throw new Error("Carts not found or data not modified");
    }
  } catch (error) {
    throw error;
  }
};

const getCartsWithPetFoodService = async () => {
  const getCarts =
  "SELECT * FROM purrpooddb.Carts INNER JOIN purrpooddb.Petfood ON Carts.food_id = Petfood.food_id"
  ;
  try {
    const [results] = await db.promise().query(getCarts);

    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCartsService,
  updateCartsQuantityService,
  getCartsWithPetFoodService,
};
