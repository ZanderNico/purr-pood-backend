const userRoute = require('../routes/user.routes');
const petFoodRoute = require('../routes/petfood.routes');
const cartsRoute = require('../routes/carts.routes');

const setRoutes = (app) => {
    app.use('/users', userRoute);
    app.use('/petfood', petFoodRoute);
    app.use('/carts', cartsRoute);
  };
  
  module.exports = setRoutes;