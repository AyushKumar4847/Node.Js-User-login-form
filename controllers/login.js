import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.render("login", { error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.render("login", { error: "Invalid email or password" });

    const token = jwt.sign(
      { _id: user._id.toString(), 
        email: user.email, 
        name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );

    res.cookie("token", token, {
      maxAge: 30 * 60 * 1000,
      httpOnly: true,
    });

    res.redirect("/");
  } catch (error) {
    res.status(500).send("Server error");
  }
};
