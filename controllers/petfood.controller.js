const petFoodService = require("../services/petfood.services.js");
const path = require('path')


const createPetfood = async (req, res) => {
  try {
    const { food_name, food_description, category, price, stock_quantity } =
      req.body;
      const { insertId, affectedRows } = await petFoodService.createPetfood(
        food_name,
        food_description,
        category,
        price,
        stock_quantity
      );
  
      if (affectedRows !== 1) {
        return res.status(500).json({ error: "Failed to create petfood" });
      }
  
      const petfoodId = insertId;

      console.log("createeddd", petfoodId)
    return res.status(201).json({
      message: "Petfood created successfully",
      input: { food_name, food_description, category, price, stock_quantity },
      food_id: petfoodId

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create petfood" });
  }
};

const getAllPetFood = async (req, res) => {
  try{
    const petfoods = await petFoodService.getAllPetFood()
    return res.status(200).json(petfoods);
  } catch(error){
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch pet foods" });
  }
}

const updatePetFood = async (req, res) => {
  try {
    const foodId = req.params.food_id;
    const newData = req.body;
    const updatedData = await petFoodService.updatePetFood(newData,foodId);
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

const deletePetfood = async (req, res) => {
  try {
    const foodId = req.params.food_id;
    const isDeleted = await petFoodService.deletePetFood(foodId);

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

const getPetFoodById = async (req, res) => {
  try{
    const foodId = req.params.food_id;
    const petFoodData = await petFoodService.getPetFoodById(foodId)
    res.status(200).json(petFoodData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve petfood" });
  }
}


//Food Image controllers here ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const uploadPetFoodImage = async (req, res) => {
  try{
    const foodId = req.params.food_id;
    const image = req.file.filename;
    const petFoodImage = await petFoodService.uploadPetFoodImage(image, foodId);
    res.status(200).send(petFoodImage);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

const getFoodImageById = async (req, res) => {
  try {
    const foodId = req.params.food_id;
    const imageName = await petFoodService.getFoodImageById(foodId)
    
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
    createPetfood,
    getAllPetFood,
    updatePetFood,
    getPetFoodById,
    uploadPetFoodImage,
    getFoodImageById,
    deletePetfood
}