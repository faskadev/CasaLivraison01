import sequelize from "../config/database.js";
import bcrypt from "bcrypt";

import {
  User,
  Restaurant,
  MenuItem,
  Order,
  OrderItem,
} from "../models/index.js";

const seed = async () => {
  try {
    console.log("Starting database seed...");
    await sequelize.sync({ force: true });

    console.log("✓ Database synced (all tables reset)");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await User.create({
      name: "md",
      email: "md@test.com",
      password_hash: hashedPassword,
    });

    console.log("User created");

    const restaurants = await Restaurant.bulkCreate([
      {
        name: "La Trattoria",
        category: "Italian",
        image_url:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/29/a6/a2/salle.jpg?w=800&h=500&s=1",
        description:
          "Authentic Italian cuisine with fresh pasta and wood-fired pizzas.",
        rating: 4.5,
      },
      {
        name: "Le Bistro",
        category: "French",
        image_url:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/28/7d/8f/casablanca-bistro.jpg?w=700&h=400&s=1",
        description:
          "Cozy French bistro serving classic dishes and fine wines.",
        rating: 4.3,
      },
      {
        name: "Tapas & Co",
        category: "Spanish",
        image_url:
          "https://media-cdn.tripadvisor.com/media/photo-s/07/8f/f4/43/casa-alcalde.jpg",
        description:
          "Traditional Spanish tapas and paellas with a modern twist.",
        rating: 4.2,
      },
      {
        name: "The German Sausage",
        category: "German",
        image_url:
          "https://dumaguete.com/wp-content/uploads/2014/08/casablanca-top.jpg",
        description: "Specialty sausages, pretzels, and hearty German meals.",
        rating: 4.0,
      },
      {
        name: "Nordic Delights",
        category: "Scandinavian",
        image_url:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/99/c9/0d/casa-alcalde.jpg?w=900&h=200&s=1",
        description:
          "Fresh Nordic cuisine with seafood and traditional recipes.",
        rating: 4.4,
      },
      {
        name: "Sushi World",
        category: "Japanese",
        image_url:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/91/5a/56/sushi-japanese.jpg?w=900&h=500&s=1",
        description:
          "Fresh sushi, sashimi, and Japanese dishes made by expert chefs.",
        rating: 4.7,
      },
      {
        name: "Taco Fiesta",
        category: "Mexican",
        image_url:
          "https://walnuts.org/wp-content/uploads/2018/10/Pork-walnut-tacos-hero-shot-900x600.jpg",
        description: "Authentic Mexican tacos, burritos, and spicy delights.",
        rating: 4.3,
      },
      {
        name: "Curry House",
        category: "Indian",
        image_url:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/2f/95/d0/some-of-the-wkends-dish.jpg?w=900&h=500&s=1",
        description:
          "Traditional Indian curries, biryanis, and tandoori dishes.",
        rating: 4.6,
      },
      {
        name: "Le Gourmet",
        category: "French",
        image_url:
          "https://tb-static.uber.com/prod/image-proc/processed_images/bc82f9699f33f7d377ddb271650afbc0/fb86662148be855d931b37d6c1e5fcbe.jpeg",
        description: "Elegant French cuisine with fine dining experience.",
        rating: 4.9,
      },
    ]);

    console.log("Restaurants created");

    await MenuItem.bulkCreate([
      // Moroccan Taste
      {
        name: "Tagine Lamb",
        price: 85,
        description:
          "Slow-cooked lamb tagine with rich Moroccan spices and preserved lemon.",
        rating: 4.6,
        ingredients: "Lamb, onions, tomatoes, spices, preserved lemon",
        image_url:
          "https://ik.imagekit.io/huntermed/images.jpg?updatedAt=1771019562006",
        restaurant_id: restaurants[0].id,
      },
      {
        name: "Couscous Royale",
        price: 75,
        description:
          "Traditional Moroccan couscous served with vegetables and tender lamb.",
        rating: 4.4,
        ingredients: "Semolina, vegetables, chickpeas, lamb, broth",
        image_url:
          "https://ik.imagekit.io/huntermed/i183013-couscous-marocain.jpeg?updatedAt=1771019571377",
        restaurant_id: restaurants[0].id,
      },

      
      {
        name: "Chicken Noodles",
        price: 65,
        description:
          "Stir-fried egg noodles with juicy chicken and fresh vegetables.",
        rating: 4.2,
        ingredients: "Egg noodles, chicken, vegetables, soy sauce, garlic",
        image_url:
          "https://ik.imagekit.io/huntermed/NOODLES.jpg?updatedAt=1771019561963",
        restaurant_id: restaurants[1].id,
      },
      {
        name: "Fried Rice",
        price: 55,
        description:
          "Classic Chinese fried rice with eggs, vegetables and soy sauce.",
        rating: 4.1,
        ingredients: "Rice, eggs, vegetables, soy sauce, chicken",
        image_url:
          "https://images.getrecipekit.com/20220904015448-veg-20fried-20rice.png?aspect_ratio=16:9&quality=90&",
        restaurant_id: restaurants[1].id,
      },

      
      {
        name: "Pizza Margherita",
        price: 95,
        description: "Authentic Italian pizza with fresh mozzarella and basil.",
        rating: 4.8,
        ingredients: "Tomato sauce, mozzarella cheese, fresh basil, olive oil",
        image_url:
          "https://ik.imagekit.io/huntermed/homemade-pizza-in-air-fryer.jpg?updatedAt=1771019571537",
        restaurant_id: restaurants[2].id,
      },
      {
        name: "Pasta Carbonara",
        price: 80,
        description: "Creamy pasta with parmesan cheese and crispy pancetta.",
        rating: 4.5,
        ingredients: "Spaghetti, eggs, parmesan, pancetta, pepper",
        image_url:
          "https://www.jonesdairyfarm.com/wp-content/uploads/2024/04/Spaghetti-Carbonara-1024x683.jpg.webp",
        restaurant_id: restaurants[2].id,
      },

      
      {
        name: "Cheeseburger Deluxe",
        price: 55,
        description:
          "Grilled beef burger topped with melted cheese and fresh veggies.",
        rating: 4.3,
        ingredients: "Ground beef, cheese, lettuce, tomato, pickles, bun",
        image_url:
          "https://ik.imagekit.io/huntermed/BURGER.jpg?updatedAt=1771019569223",
        restaurant_id: restaurants[3].id,
      },
      {
        name: "Fries Basket",
        price: 25,
        description: "Golden crispy french fries served with ketchup.",
        rating: 4.0,
        ingredients: "Crispy french fries with ketchup",
        image_url:
          "https://olo-images-live.imgix.net/16/161a5a82d5524cd5ac9e356712ec4885.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=d663f727f0937a2a28e1d909a0c2e047",
        restaurant_id: restaurants[3].id,
      },

      // Sushi World
      {
        name: "Salmon Sushi",
        price: 120,
        description: "Fresh salmon slices over seasoned sushi rice.",
        rating: 4.9,
        ingredients: "Fresh salmon, sushi rice, nori, wasabi",
        image_url:
          "https://jfoodie.ca/cdn/shop/articles/AdobeStock_913066063_2.jpg?v=1740269054&width=1500",
        restaurant_id: restaurants[4].id,
      },
      {
        name: "California Roll",
        price: 100,
        description: "Classic California roll with crab and avocado.",
        rating: 4.6,
        ingredients: "Crab, avocado, cucumber, sushi rice, nori",
        image_url:
          "https://san-j.com/wp-content/uploads/2022/04/20220301_164950-1.jpg",
        restaurant_id: restaurants[4].id,
      },

      // Taco Fiesta
      {
        name: "Beef Tacos",
        price: 50,
        description: "Mexican tacos filled with seasoned beef and fresh salsa.",
        rating: 4.3,
        ingredients: "Beef, tortilla, lettuce, cheese, salsa",
        image_url:
          "https://www.onceuponachef.com/images/2023/08/Beef-Tacos-760x570.jpg",
        restaurant_id: restaurants[5].id,
      },
      {
        name: "Chicken Burrito",
        price: 60,
        description: "Grilled chicken burrito wrapped with rice and beans.",
        rating: 4.4,
        ingredients: "Chicken, rice, beans, cheese, tortilla",
        image_url:
          "https://nomoneynotime.com.au/imager/uploads/recipes/1490/Chicken-Burrito_461122a663362b265b24d0ffaf0f7f5f.webp",
        restaurant_id: restaurants[5].id,
      },

      // Curry House
      {
        name: "Chicken Tikka Masala",
        price: 85,
        description: "Creamy tomato-based curry with tender chicken pieces.",
        rating: 4.7,
        ingredients: "Chicken, spices, tomato sauce, cream",
        image_url:
          "https://www.spicebangla.com/wp-content/uploads/2024/04/chicken-tikka-masala.jpg",
        restaurant_id: restaurants[6].id,
      },
      {
        name: "Vegetable Biryani",
        price: 70,
        description:
          "Fragrant basmati rice cooked with mixed vegetables and spices.",
        rating: 4.5,
        ingredients: "Rice, vegetables, spices, herbs",
        image_url:
          "https://img.taste.com.au/ajFMiq0L/w643-h428-cfill-q90/taste/2016/11/vegetable-biryani-102620-1.jpeg",
        restaurant_id: restaurants[6].id,
      },

      // Le Gourmet
      {
        name: "Duck Confit",
        price: 150,
        description: "Slow-cooked duck leg with crispy skin and herb potatoes.",
        rating: 4.9,
        ingredients: "Duck leg, herbs, potatoes",
        image_url:
          "https://images.sbs.com.au/dims4/default/4284884/2147483647/strip/true/crop/1500x844+0+79/resize/1280x720!/quality/90/?url=http%3A%2F%2Fsbs-au-brightspot.s3.amazonaws.com%2Fdrupal%2Ffood%2Fpublic%2Frx093_french_6_of_6.jpg&imwidth=960",
        restaurant_id: restaurants[7].id,
      },
      {
        name: "Crème Brûlée",
        price: 45,
        description: "Classic French dessert with caramelized sugar crust.",
        rating: 4.6,
        ingredients: "Cream, sugar, vanilla, caramelized top",
        image_url:
          "https://www.splenda.com/wp-content/themes/bistrotheme/assets/recipe-images/coconut-creme-brulee-1400w.jpg",
        restaurant_id: restaurants[7].id,
      },
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
