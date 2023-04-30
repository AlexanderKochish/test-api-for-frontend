const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./db");
const router = require("./routes/router");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cron = require("node-cron")
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { deleteOldUsers } = require("./clearDB");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(express.static("public"));

const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set("x-powered-by","")
app.use(notFound)
app.use(errorHandler)
cron.schedule('0 15 * * *',() => deleteOldUsers)

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    app.listen(PORT);
  } catch (error) {
    console.log({message: error.message})
  }
}

start();
