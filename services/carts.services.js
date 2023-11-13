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

module.exports = {
  createCartsService,
};
