const db = require('../db/db.js')
const fs = require('fs-extra');
const path = require('path');

const createPetfoodService = async (food_name, food_description, category, price, stock_quantity) => {
    const values = [food_name, food_description, category, price, stock_quantity]
    try {
        const [results] = await db
          .promise()
          .query(
            "INSERT INTO purrpooddb.PetFood (food_name, food_description, category, price, stock_quantity) VALUES (?, ?, ?, ?, ?)",
            values
          );
        console.log("petfood service: ", results)
        const petfoodId = results.insertId;
        return petfoodId;
      } catch (error) {
        throw error;
      }
}

const updatePetFoodService = async (updatedFood, foodId) => {
  const update = "UPDATE purrpooddb.PetFood SET ? WHERE food_id = ?";
  const values = [updatedFood, foodId]
  try {
    const [results] = await db
      .promise()
      .query(update, values);

    if (results.affectedRows > 0) {
      return true;
    } else {
      throw new Error("Petfood not found or data not modified");
    }
  } catch (error) {
    throw error;
  }
}

const getPetFoodByIdService = async (foodId) => {
  const getId = "SELECT * FROM purrpooddb.PetFood WHERE food_id = ?"
  const value = [foodId]
  try{
    const [results] = await db
      .promise()
      .query(getId, value);

    if (results.length === 1) {
    return results;
    } else {
      throw new Error("Pet food not found");
    }
  } catch (error){
    throw error
  }
}

const getAllPetFoodService = async () => {
  try{
    const [results] = await db.promise().query("SELECT * FROM purrpooddb.PetFood");

    return results
  } catch (error){
    throw error 
  }
}

const deletePetFoodService = async (foodId) => {
  try {
    // Get the image URL before deleting the pet food
    const imageUrl = await getFoodImageByIdService(foodId);

    // Delete the pet food
    const deleteQuery = "DELETE FROM purrpooddb.PetFood WHERE food_id = ?";
    const deleteValues = [foodId];
    const [deleteResult] = await db.promise().query(deleteQuery, deleteValues);

    if (deleteResult.affectedRows > 0) {
      // Extract the image URL from the result metadata

    // If the pet food is deleted successfully and has an associated image, delete the image file
    if (imageUrl) {
      // Construct the image path based on your storage setup
      const imagePath = path.join(__dirname, "../images/petfood/", imageUrl);

      await fs.unlink(imagePath);
    }

      return true;
    } else {
      throw new Error("Petfood not found or not deleted");
    }
  } catch (error) {
    throw error;
  }
};

//Food Image Service here ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const uploadPetFoodImageService = async (file, foodId) =>{
  const foodImageUrl = file;

  const sql = 'UPDATE purrpooddb.PetFood SET food_image = ? WHERE food_id = ?';
  const values = [foodImageUrl, foodId];

  try {
    await db.promise().query(sql, values);
    return 'Image uploaded and URL stored in the database.';
  } catch (error) {
    console.error(error);
    throw 'An error occurred while processing the image.';
  }
}

const getFoodImageByIdService = async (foodId) => {
  try {
    const [result] = await db
      .promise()
      .query("SELECT food_image FROM purrpooddb.PetFood WHERE food_id = ?", [foodId])

      if (result && result.length > 0) {
        return result[0].food_image;
      } else {
        return null;
      }
  } catch (error) {
    throw error
  }
}


module.exports = {
    createPetfoodService,
    updatePetFoodService,
    getAllPetFoodService,
    getPetFoodByIdService,
    uploadPetFoodImageService,
    getFoodImageByIdService,
    deletePetFoodService
}