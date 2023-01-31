const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('product', {
    wine: {
    type: DataTypes.STRING,
      allowNull: false,
    },
    winery: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    country: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
    }, 
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    onSale: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    },
    totalSalesCurrent: {
      type: DataTypes.INTEGER,
    },
    stock:{
      type: DataTypes.INTEGER,
      defaultValue:5,
    }
  }, {
    paranoid: true
  });
};
