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

const updateCartsQuantityController = async (req, res) => {
  const { quantity } = req.body; 
  const { cart_id } = req.params;

  try {
    const result = await cartsService.updateCartsQuantityService(quantity, cart_id);
    res.json({ success: true, message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Error updating cart:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

const getCartWithPetFoodController = async (req, res) => {
  try {
    const carts = await cartsService.getCartsWithPetFoodService();
    return res.status(200).json(carts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch pet carts" });
  }
};

const getUsersWithCartsAndPetFoodController = async (req, res) => {
  try {
    const carts = await cartsService.getUsersWithCartsAndPetFoodService();
    res.json({ success: true, data: carts });
  } catch (error) {
    console.error("Error getting users with carts:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteCartController = async (req, res) => {
  const { cart_id } = req.params;

  try {
    const result = await cartsService.deleteCartService(cart_id)
    res.json({ success: true, message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  createCartsController,
  updateCartsQuantityController,
  getCartWithPetFoodController,
  getUsersWithCartsAndPetFoodController,
  deleteCartController
};
