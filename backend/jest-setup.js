import { sequelize, User } from "./src/models/index.js";
import bcrypt from "bcrypt";

export default async () => {
  try {
    // Authenticate with database
    await sequelize.authenticate();
    console.log("Database authenticated");

    // Sync the database
    await sequelize.sync({ force: true });
    console.log("Test database synced");

    // Seed test user
    const hashedPassword = await bcrypt.hash("azerty", 10);
    await User.create({
      name: "Mohamed",
      email: "mohamed@mail.com",
      password_hash: hashedPassword
    });
    console.log("Test user created");
  } catch (error) {
    console.error("Jest setup error:", error);
    throw error;
  }
};
