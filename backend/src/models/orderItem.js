import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrderItem = sequelize.define ('OrderItem' ,{
    id :{
        type: DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true,
    },
    order_id :{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    menu_item_id :{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    quantity :{
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    price :{
        type: DataTypes.FLOAT,
        allowNull : false,
    },
});

export default OrderItem ;