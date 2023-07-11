import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskModel.js";

export const createTask = async (req, res, next) => {
    try {
        const { title, desc } = req.body;
        const userId = req.user._id;
        const task = await Task.create({ title, desc, user: userId });
        res.status(201).json({
            success: true,
            message: "Task created Successfully",
            task,
        })
    } catch (error) {
        next(error)
    }
}
export const myAllTask = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });
        res.status(202).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}
export const updateMyTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return next(new ErrorHandler("Tasks Not Found",404));
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json({
            success: true,
            message: "Task is Updated",
            task,
        })
    } catch (error) {
        next(error);
    }
}
export const deleteMyTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);
        if(!task) return next(new Error("Task Not found"));
        task.deleteOne()
        res.status(200).json({
            success: true,
            message: "Task is Deleted",
            task,
        })
    } catch (error) {
        next(error)
    }
}