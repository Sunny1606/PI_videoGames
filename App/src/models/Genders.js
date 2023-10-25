const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('genders', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unknown',
    },
  }, {timestamps: false });
};