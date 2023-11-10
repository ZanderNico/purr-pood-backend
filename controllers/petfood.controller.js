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

const updatePetFoodController = async (req, res) => {
  try {
    const foodId = req.params.food_id;
    const newData = req.body;
    const updatedData = await petFoodService.updatePetFoodService(newData,foodId);
    if (updatedData) {
      res.status(200).json({ message: "Pet food updated successfully" });
    } else {
      res.status(404).json({ error: "Pet food not found or data not modified" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update pet food" });
  }
}

const deletePetfoodController = async (req, res) => {
  try {
    const foodId = req.params.food_id;
    const isDeleted = await petFoodService.deletePetFoodService(foodId);

    if (isDeleted) {
      return res.status(200).json({ message: "Petfood and image deleted successfully" });
    } else {
      return res.status(404).json({ error: "Petfood not found or not deleted" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete petfood" });
  }
};

const getPetFoodByIdController = async (req, res) => {
  try{
    const foodId = req.params.food_id;
    const petFoodData = await petFoodService.getPetFoodByIdService(foodId)
    res.status(200).json(petFoodData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve petfood" });
  }
}


//Food Image Controllers here ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
    updatePetFoodController,
    getPetFoodByIdController,
    uploadPetFoodImageController,
    getFoodImageByIdController,
    deletePetfoodController
}