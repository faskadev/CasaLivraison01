import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menuItem" , menuItemRoutes);
app.use("/api/orders" , orderRoutes);

app.get("/", (req, res) => {
  res.send("CasaLivraison API is running");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });

    console.log("Models synced");

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("Server error:", error);
  }
};

startServer();
