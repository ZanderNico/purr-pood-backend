const express = require('express');
const cors = require('cors')
require('dotenv').config();
const userRoute = require('./routes/user.routes')
const petFoodRoute = require('./routes/petfood.routes')
const cartsRoute = require("./routes/carts.routes")
const { corsOptions } = require('./config/cors')

const app = express();

app.use(cors(corsOptions))

app.use(express.json());
app.use('/users', userRoute)
app.use('/petfood', petFoodRoute)
app.use("/carts", cartsRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});