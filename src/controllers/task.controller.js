import Task from "../models/task.model.js";


export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.userId
        }).populate("user");
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    const {title,description,date} = req.body;
    const newTask = new Task({title,description,date, user: req.userId});
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("user");
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { title, description, date }, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
