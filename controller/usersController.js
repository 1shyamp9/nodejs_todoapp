import { User } from "../models/usersModel.js";
import bcrypt from 'bcrypt';
import { createCookie } from "../utils/features.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            res.status(404).json({
                success: false,
                message: "User Already Exists!",
            })
        }
        const hashedPass = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashedPass });
        createCookie(user, res, "User created Successfully", 201);
    } catch (error) {
        console.log(error)
    }

}
export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Invalid Email or Password",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(404).json({
                success: false,
                message: "Invalid Email or Password",
            })
        }
        createCookie(user, res, `Welcome Back , ${user.name}`, 200);
    } catch (error) {
        console.log(error);
    }

}
export const getMyProfile = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        console.log(error);
    }
}
export const logOut = (req, res) => {
    try { 
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Delevopment" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Delevopment" ? false : true
        }).json({
            success: true,
            message: "Logout Successfully",
        })
    } catch (error) {
        console.log(error)
    }
}
// export const updateUser = async (req, res) => {
//     let user = await User.findById(req.params.id);
//     user = await User.findByIdAndUpdate(req.params.id, req.body);
//     res.status(200).json({
//         success: true,
//         message: "User updated Successfully",
//     })
// }
// export const deleteUser = async (req, res) => {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json({
//         success: true,
//         message: "User deleted Successfully",
//     })
// }