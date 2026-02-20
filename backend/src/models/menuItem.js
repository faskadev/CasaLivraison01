import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const MenuItem = sequelize.define("MenuItem", {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  rating: {
    type: DataTypes.DECIMAL(2,1), 
    allowNull: false,
    validate: {
      min: 3,
      max: 5,
    },
  },

  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  timestamps: true
});

export default MenuItem;