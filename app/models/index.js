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
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.user.belongsToMany(db.tiles, {
    through: "user_tiles",
    foreignKey: "userId",
    otherKey:  "tileId"
});
db.tiles.belongsToMany(db.user, {
    through: "user_tiles",
    foreignKey: "tileId",
    otherKey: "userId"
})

db.ROLES = ["user","owner","admin"];

module.exports = db;