import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
