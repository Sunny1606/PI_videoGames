const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('genres', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
       defaultValue: DataTypes.UUIDV4,
       allowNull : false,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unknown',
    },
  }, {timestamps: false });
};