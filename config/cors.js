module.exports = {
  corsOptions: {
    origin: "http://localhost:3000", // replace with your actual frontend domain
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  },
};
