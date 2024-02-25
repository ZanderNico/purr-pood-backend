const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { corsOptions } = require('./config/cors')
const setRoutes = require("./routes/index")

const app = express();

app.use(cors(corsOptions))

app.use(express.json());

setRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});