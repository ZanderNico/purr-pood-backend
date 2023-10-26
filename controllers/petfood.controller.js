const petFoodService = require("../services/petfood.services.js");
const path = require('path')

const createPetfoodController = async (req, res) => {
  try {
    const { food_name, food_description, category, price, stock_quantity } =
      req.body;
    const petfoodId = await petFoodService.createPetfoodService(
      food_name,
      food_description,
      category,
      price,
      stock_quantity
    );
    return res.status(201).json({
      message: "Petfood created successfully",
      input: { food_name, food_description, category, price, stock_quantity },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create petfood" });
  }
};

const getAllPetFoodController = async (req, res) => {
  try{
    const petfoods = await petFoodService.getAllPetFoodService()
    return res.status(200).json(petfoods);
  } catch(error){
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch pet foods" });
  }
}

const uploadPetFoodImageController = async (req, res) => {
  try{
    const foodId = req.params.food_id;
    const image = req.file.filename;
    const petFoodImage = await petFoodService.uploadPetFoodImageService(image, foodId);
    res.status(200).send(petFoodImage);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

const getFoodImageByIdController = async (req, res) => {
  try {
    const foodId = req.params.food_id;
    const imageName = await petFoodService.getFoodImageByIdService(foodId)
    
    if (!imageName) {
      res.status(404).send('Image not found.');
    } else {
      const imagePath = path.join(__dirname, '../images/petfood', imageName);
      res.sendFile(imagePath);
    }
  } catch (error) {
    console.error(error);
    if (error === 'Image not found.') {
      res.status(404).send('Image not found.');
    } else {
      res.status(500).send('Error retrieving the image.');
    }
  }
}

module.exports = {
    createPetfoodController,
    getAllPetFoodController,
    uploadPetFoodImageController,
    getFoodImageByIdController
}