import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { createTask, deleteMyTask, myAllTask, updateMyTask } from "../controller/taskController.js";

const router = express.Router();

router.post('/new',isAuth,createTask);

router.get('/mytasks',isAuth,myAllTask);

router.route('/:id').put(isAuth,updateMyTask).delete(isAuth,deleteMyTask);

export default router;