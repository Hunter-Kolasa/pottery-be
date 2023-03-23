const dbConfig = require("../config/db.config.js");
require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URI);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require('./role.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.tiles = require('./tile.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_data",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_data",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.user.belongsToMany(db.tiles, {
    through: "user_data",
    foreignKey: "userId",
    otherKey:  "tileId"
});

db.ROLES = ["user","owner","admin"];

module.exports = db;