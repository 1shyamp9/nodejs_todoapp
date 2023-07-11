import express from "express"; 
import {createUser,getMyProfile, logOut, loginUser} from "../controller/usersController.js";
import { isAuth } from "../middlewares/auth.js";
const router = express.Router(); 

router.post('/create', createUser)

router.post('/login', loginUser)

router.get('/me',isAuth, getMyProfile)

router.get('/logout',isAuth, logOut)

// Update User && Delete User 
// router.route('/:id').put(updateUser).delete(deleteUser)


export default router;