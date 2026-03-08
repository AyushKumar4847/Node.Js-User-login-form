import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async(req, res, next) => {
    const token = req.cookies.token;
    
    if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET,{ expiresIn: '30m' });
            const user = await User.findById(decoded._id);
            
            if (user) {
                req.user = user;
                next();
            } else {   
                res.render('login');
            }
    } else {
        res.render('login');
    }
}
