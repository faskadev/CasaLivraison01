import express from "express";
import {
  createMenuItem,
  getAllMenuItems,
  getMenuItemsByRestaurant,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuItemController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/" , getAllMenuItems);
router.get("/" , getMenuItemsByRestaurant);
router.post("/restaurant/:restaurantId" , protect , createMenuItem);
router.put("/.id" , protect , updateMenuItem);
router.delete("/.id" , protect , deleteMenuItem);

export default router;


