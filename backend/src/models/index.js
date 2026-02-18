import sequelize from "../config/database.js";
import User from "./user.js";
import MenuItem from "./menuItem.js";
import Order from "./order.js";
import OrderItem from "./orderItem.js";
import Restaurant from "./restaurant.js";

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Restaurant.hasMany(MenuItem, { foreignKey: "restaurant_id" });
MenuItem.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

MenuItem.hasMany(OrderItem, { foreignKey: "menu_item_id" });
OrderItem.belongsTo(MenuItem, { foreignKey: "menu_item_id" });



export { sequelize, User , MenuItem , Order , OrderItem , Restaurant };