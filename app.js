const express = require('express');
require('dotenv').config();
const userRoute = require('./routes/user.routes')
const petFoodRoute = require('./routes/petfood.routes')

const app = express();

app.use(express.json());
app.use('/users', userRoute)
app.use('/petfood', petFoodRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});