const db = require('../db/db.js')

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

const getAllPetFoodService = async () => {
  try{
    const [results] = await db.promise().query("SELECT * FROM purrpooddb.PetFood");

    return results
  } catch (error){
    throw error 
  }
}

module.exports = {
    createPetfoodService,
    getAllPetFoodService,
    uploadPetFoodImageService,
    getFoodImageByIdService
}