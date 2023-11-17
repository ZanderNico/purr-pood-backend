const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/carts.controller")


//add cart
router.post("/addToCart", cartsController.createCartsController)

//get carts
router.get("/", cartsController.getCartWithPetFoodController)

module.exports = router;