const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("videogame", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      unique: true,
    },
    platform: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      unique: true,
    },
    rating: {
      type: DataTypes.DECIMAL(3,2),
    },
  }, {timestamps: false });
};
