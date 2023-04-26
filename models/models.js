const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: false },
  position_user: { type: DataTypes.STRING, allowNull: false },
});

const Position = sequelize.define("positions", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
});

Position.hasOne(User);
User.belongsTo(Position);

module.exports = {
  User,
  Position,
};