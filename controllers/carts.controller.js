const cartsService = require("../services/carts.services");

const createCarts = async (req, res) => {
  try {
    const { customer_id, food_id, quantity } = req.body;
    const cartId = await cartsService.createCarts(
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

const updateCartsQuantity = async (req, res) => {
  const { quantity } = req.body; 
  const { cart_id } = req.params;

  try {
    const result = await cartsService.updateCartsQuantity(quantity, cart_id);
    res.json({ success: true, message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Error updating cart:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

const getCartWithPetFood = async (req, res) => {
  try {
    const carts = await cartsService.getCartsWithPetFood();
    return res.status(200).json(carts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch pet carts" });
  }
};

const getUsersWithCartsAndPetFood = async (req, res) => {
  try {
    const carts = await cartsService.getUsersWithCartsAndPetFood();
    res.json({ success: true, data: carts });
  } catch (error) {
    console.error("Error getting users with carts:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteCart = async (req, res) => {
  const { cart_id } = req.params;

  try {
    const result = await cartsService.deleteCart(cart_id)
    res.json({ success: true, message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  createCarts,
  updateCartsQuantity,
  getCartWithPetFood,
  getUsersWithCartsAndPetFood,
  deleteCart
};
