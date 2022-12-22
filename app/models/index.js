const dbConfig = require("../config/db.config.js");
require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URI);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tiles = require("./tile.model.js")(sequelize, Sequelize);

module.exports = db;