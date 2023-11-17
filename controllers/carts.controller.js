const cartsService = require("../services/carts.services");

const createCartsController = async (req, res) => {
  try {
    const { customer_id, food_id, quantity } = req.body;
    const cartId = await cartsService.createCartsService(
      customer_id,
      food_id,
      quantity
    );
    return res.status(201).json({
      message: "cart created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create cart" });
  }
};

const getCartWithPetFoodController = async (req, res) => {
  try {
    const carts = await cartsService.getCartsWithPetFoodService();
    return res.status(200).json(carts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch pet carts" });
  }
};

module.exports = { createCartsController, getCartWithPetFoodController };
