import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register',{error:"user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword });
        
        const token = jwt.sign({_id: user._id.toString(), email: user.email}, process.env.JWT_SECRET,{ expiresIn: '30m' })

        res.cookie("token", token, {
            maxAge:  30 * 60 * 1000,
            httpOnly: true
        });

        res.redirect("/");

    } catch (error) {
        res.status(500).send("Server Error");
    }
};
