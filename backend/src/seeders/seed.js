import sequelize from "../config/database.js";
import bcrypt from "bcrypt";

import {
  User,
  Restaurant,
  MenuItem,
  Order,
  OrderItem
} from "../models/index.js";


const seed = async () => {

  try {

    await sequelize.sync({ force: true });

    console.log("Database reset");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await User.create({
      name: "md",
      email: "md@test.com",
      password_hash: hashedPassword
    });

    console.log("User created");


    const restaurants = await Restaurant.bulkCreate([
      {
        name: "Moroccan Taste",
        category: "Moroccan",
        image_url: "https://ik.imagekit.io/huntermed/moroccan.png"
      },
      {
        name: "Dragon Express",
        category: "Chinese",
        image_url: "https://ik.imagekit.io/huntermed/chinese.png"
      },
      {
        name: "Pizza Roma",
        category: "Italian",
        image_url: "https://ik.imagekit.io/huntermed/italian.png"
      },
      {
        name: "Burger House",
        category: "Fast Food",
        image_url: "https://ik.imagekit.io/huntermed/burgershop.png"
      }
    ]);

    console.log("Restaurants created");


  
    await MenuItem.bulkCreate([

      {
        name: "Tagine",
        price: 80,
        ingredients: "Lamb, onions, tomatoes, spices, preserved lemon",
        restaurant_id: restaurants[0].id
        
      },

      {
        name: "Couscous",
        price: 70,
        ingredients: "Semolina, vegetables, chickpeas, broth",
        restaurant_id: restaurants[0].id
      },

      {
        name: "Noodles",
        price: 60,
        ingredients: "Egg noodles, vegetables, soy sauce, garlic",
        restaurant_id: restaurants[1].id
      },

      {
        name: "Pizza Margherita",
        price: 90,
        ingredients: "Tomato sauce, mozzarella cheese, fresh basil, olive oil",
        restaurant_id: restaurants[2].id
      },

      {
        name: "Cheeseburger",
        price: 50,
        ingredients: "Ground beef, cheese, lettuce, tomato, pickles, bun",
        restaurant_id: restaurants[3].id
      }

    ]);

    console.log("Menu items created");

    console.log("SEED COMPLETE");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit();

  }

};

seed();
