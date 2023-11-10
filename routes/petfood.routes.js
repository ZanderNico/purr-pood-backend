const express = require("express");
const router = express.Router();
const petFoodController = require("../controllers/petfood.controller");
const upload = require("../config/multerConfig");

//add petfood
router.post("/create-petfood", petFoodController.createPetfoodController);

//get petfoods
router.get("/", petFoodController.getAllPetFoodController);

//upload food image
router.put(
  "/upload-image/:food_id",
  upload.single("food_image"),
  petFoodController.uploadPetFoodImageController
);

//update pet food
router.put("/:food_id", petFoodController.updatePetFoodController)

//delete pet food
router.delete("/delete/:food_id", petFoodController.deletePetfoodController)

//get image only
router.get('/get-image/:food_id', petFoodController.getFoodImageByIdController)

//get data by Id
router.get('/:food_id', petFoodController.getPetFoodByIdController)

module.exports = router;

