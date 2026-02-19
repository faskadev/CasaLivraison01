import request from "supertest";
import app from "../src/app.js";
import { sequelize } from "../src/models/index.js";

describe("POST /api/auth/login", () => {

  it("should login successfully with correct credentials", async () => {

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "mohamed@mail.com",
        password: "azerty"
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("token");

  });

});

 it("should fail login with incorrect credentials", async () => {

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "incorrect@example.com", 
        password: "wrongpassword"
        });
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid credentials");
    });

afterAll(async () => {
  await sequelize.close();
});
