const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    reports: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    }
  }, {
    paranoid: true
  });
}
