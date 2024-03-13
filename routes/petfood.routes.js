const express = require("express");
const router = express.Router();
const petFoodController = require("../controllers/petfood.controller");
const upload = require("../config/multerConfig");
const checkAdminRole = require("../middlewares/adminRole");
const verifyToken = require("../middlewares/auth");

//add petfood
router.post(
  "/create-petfood", verifyToken,
  checkAdminRole,
  petFoodController.createPetfood
);

//get petfoods
router.get("/", petFoodController.getAllPetFood);

//upload food image
router.put(
  "/upload-image/:food_id",
  upload.single("food_image"),
  verifyToken,
  checkAdminRole,
  petFoodController.uploadPetFoodImage
);

//update pet food
router.put("/:food_id", verifyToken, checkAdminRole, petFoodController.updatePetFood);

//delete pet food
router.delete(
  "/delete/:food_id", verifyToken,
  checkAdminRole,
  petFoodController.deletePetfood
);

//get image only
router.get("/get-image/:food_id", petFoodController.getFoodImageById);

//get data by Id
router.get("/:food_id", petFoodController.getPetFoodById);

module.exports = router;
