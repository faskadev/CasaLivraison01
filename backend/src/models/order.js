import { DataTypes } from "sequelize"; 
import sequelize from "../config/database.js";

const Order = sequelize.define ('Order' , {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,  
        primaryKey : true,
        autoIncrement : true,
    },
    user_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull : false,
    },
    total_price :{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    delivery_address : {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

export default Order;