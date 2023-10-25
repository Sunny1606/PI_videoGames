const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
      },
    },
    { timestamps: false }
  );
};
