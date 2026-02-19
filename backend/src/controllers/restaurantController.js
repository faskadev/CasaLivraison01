import { Restaurant } from "../models/index.js";

export const createRestaurant = async (req , res) => {
    try {
        const { name , address , phone } = req.body;
        const restaurant = await Restaurant.create({name , address, phone});
        res.status(201).json(restaurant);

    }catch(error){
        res.status(500).json({error : error.message })
    }
};

export const getAllRestaurants = async ( req , res ) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

export const getRestaurantById = async ( req , res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if(!restaurant){
            return res.status(404).json({message : "restaurant not found"});

        } res.json(restaurant);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};
export const updateRestaurant = async ( req , res ) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
         if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    } 
    await restaurant.update(req.body);
    res.json(restaurant);

    }catch(error){
        res.status(500).json({error : error.message});
    }
};

export const deleteRestaurant = async (req , res) => {
    try {   
        const restaurant = await Restaurant.findByPk(req.params.id);
         if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    } 
    await restaurant.destroy();
     res.json({ message: "Restaurant deleted" });
    }catch(error){
        res.status(500).json({error : error.message});
    }
};