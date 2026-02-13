import { Order, OrderItem, MenuItem } from "../models/index.js";

export const createOrder = async (req, res) => {
  try {

    const user_id = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item"
      });
    }

    const order = await Order.create({
      user_id: user_id,
      status: "pending",
      total_price: 0
    });

    let total = 0;

    for (const item of items) {

      const menuItem = await MenuItem.findByPk(item.menu_item_id);

      if (!menuItem) {
        return res.status(404).json({
          message: `Menu item with id ${item.menu_item_id} not found`
        });
      }

      const itemTotal = menuItem.price * item.quantity;

      total += itemTotal;

      await OrderItem.create({
        order_id: order.id,
        menu_item_id: menuItem.id,
        quantity: item.quantity,
        price: menuItem.price
      });

    }

    order.total_price = total;
    await order.save();

    return res.status(201).json({
      message: "Order created successfully",
      order: order
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};


export const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [MenuItem]
        }
      ]
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [MenuItem]
        }
      ]
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

