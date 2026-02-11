import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const MenuItem = sequelize.define ('MenuItem' ,  {
     
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name : {
    type : DataTypes.INTEGER,
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