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
      platforms: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        
      },
      released: {
        type: DataTypes.DATE,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
