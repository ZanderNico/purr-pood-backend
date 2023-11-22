const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/carts.controller")


//add cart
router.post("/addToCart", cartsController.createCartsController)

//get carts
router.get("/carts-petfood", cartsController.getCartWithPetFoodController)

//get carts withg users
router.get("/users-carts", cartsController.getUsersWithCartsAndPetFoodController)

//update quantity of the cart
router.put("/:cart_id", cartsController.updateCartsQuantityController)

//delete cart
router.delete("/:cart_id", cartsController.deleteCartController)

module.exports = router;