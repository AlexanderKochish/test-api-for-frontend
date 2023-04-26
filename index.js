const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./db");
const router = require("./routes/router");
const multer = require("multer");
const storageConfig = require("./routes/usersRoute");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cron = require('node-cron')
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { deleteOldUsers } = require("./clearDB");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(express.static('public'));
app.use(multer({ storage: storageConfig }).single("photo"));

const swaggerDocument = YAML.load('./swagger.yaml');

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set("x-powered-by","")
app.use(notFound)
app.use(errorHandler)

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    cron.schedule('0 12 * * *',deleteOldUsers)
    app.listen(PORT,() => console.log(`Server run on porrt 5000`));
  } catch (error) {
    console.log({message: error.message})
  }
}

start();
