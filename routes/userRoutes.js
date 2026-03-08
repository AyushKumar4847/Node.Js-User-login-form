import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { register } from "../controllers/register.js";
import express from "express";

const router = express.Router();


router.post("/login", login);
router.post("/register", register);
router.post("/logout",logout)
export default router;