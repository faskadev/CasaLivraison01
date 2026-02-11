import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const OrderItem = sequelize.define ('OrderItem' ,{
    id :{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    quantity :{
        type : DataTypes.INTEGER,
        allowNull : false,
    },
});

export default OrderItem ;