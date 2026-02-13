import { MenuItem , Restaurant } from "../models/index.js";

export const createMenuItem = async ( req , res ) => {
    try {
        const {name , description, price, image_url, restaurant_id} = req.body ;

        const restaurant = await Restaurant.findByPk(restaurant_id);
        if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const menuItem = await MenuItem.create({
    name,
    description,
    price,
    image_url,
    restaurant_id
    });
    res.status(201).json(menuItem);
    
    }catch(error){
         res.status(500).json({ error: error.message });
    }
};
export const getAllMenuItems = async (req , res ) => {
    try {
        const items = await MenuItem.findAll({
            include: {
                model: Restaurant,
                attributes: ["id", "name"]
            }
        });
        res.json(items);
    }catch(error){
         res.status(500).json({ error: error.message });
    }
};


export const getMenuItemsByRestaurant = async (req ,res ) => {
    try {
        const items = await MenuItem.findAll({
            where :{ restaurant_id : req.params.restaurantId }
        });
        res.json(items);
    }catch(error){
        res.status(500).json({ error: error.message})
    }
};

export const updateMenuItem = async (req ,res)=> {
    try {
        const Item = await MenuItem.findByPk(req.params,id);
         if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    await Item.update(req.body);
    res.json(Item);

    }catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMenuItem = async (req , res ) => {
    try {
        const item = await MenuItem.findByPk(req.params.id);
        if(!item){
            res.status(404).json({message : "Item not found"});
        }
        await item.destroy();
        res.json({message:"item deleted"});
    }catch(error){
        res.status(500).json({error : error.message});
    }
};
