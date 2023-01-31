const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique:true
    },
    family_name: {
      type: DataTypes.STRING
    },
    given_name: {
      type: DataTypes.STRING
    },
    logins_count: {
      type: DataTypes.STRING
    },
    purchase_history: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue:[]
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue:[]
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    }
    // },
    // createdInDb: { 
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true,
  });
};
