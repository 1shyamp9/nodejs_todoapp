
import jwt from "jsonwebtoken";
import { User } from "../models/usersModel.js";

export const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(404).json({
                success: false,
                message: "Login First!",
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRATE)

        req.user = await User.findById(decoded._id);

        next();
    } catch (error) {
        console.log(error);
    }
}