const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/carts.controller");
const verifyToken = require("../middlewares/auth");
const checkAdminRole = require("../middlewares/adminRole");

//add cart
router.post("/addToCart", verifyToken, cartsController.createCarts);

//get carts
router.get(
  "/carts-petfood",
  verifyToken,
  checkAdminRole,
  cartsController.getCartWithPetFood
);

//get carts withg users
router.get(
  "/users-carts",
  verifyToken,
  checkAdminRole,
  cartsController.getUsersWithCartsAndPetFood
);

//update quantity of the cart
router.put(
  "/:cart_id",
  verifyToken,
  cartsController.updateCartsQuantity
);

router.get("/users-carts/:id", verifyToken, cartsController.getUserByIdWithCarts)

//delete cart
router.delete("/:cart_id", verifyToken, cartsController.deleteCart);

module.exports = router;
