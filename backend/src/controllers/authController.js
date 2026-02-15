import {User} from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req , res) =>{
    try {
        const {name , email , password} = req.body;
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await User.create({name , email , password_hash:hashedPassword});
        res.status(201).json({
        message: "User created",
          user: {
          id: user.id,
          name: user.name,
          email: user.email
  }
});

    }catch(error){
        res.status(401).json({error : error.message});
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("User found:", user.email);
    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
