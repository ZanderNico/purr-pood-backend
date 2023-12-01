const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/carts.controller");
const verifyToken = require("../middlewares/auth");
const checkAdminRole = require("../middlewares/adminRole");

//add cart
router.post("/addToCart", verifyToken, cartsController.createCartsController);

//get carts
router.get(
  "/carts-petfood",
  verifyToken,
  checkAdminRole,
  cartsController.getCartWithPetFoodController
);

//get carts withg users
router.get(
  "/users-carts",
  verifyToken,
  checkAdminRole,
  cartsController.getUsersWithCartsAndPetFoodController
);

//update quantity of the cart
router.put(
  "/:cart_id",
  verifyToken,
  cartsController.updateCartsQuantityController
);

//delete cart
router.delete("/:cart_id", verifyToken, cartsController.deleteCartController);

module.exports = router;
