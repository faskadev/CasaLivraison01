import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const MenuItem = sequelize.define ('MenuItem' ,  {
     
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name : {
    type : DataTypes.STRING,
    allowNull: false,
  },
  price : {
    type : DataTypes.FLOAT,
    allowNull : false,
  },
  ingredients : {
    type : DataTypes.TEXT,
    allowNull : false,
  },

});
export default MenuItem;