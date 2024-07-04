import express, { Router } from "express";
import controllers from "./controllers";

const task: Router = express.Router();

task.post("/addTask", controllers.addTask)
task.post("/updateTask", controllers.updateTask)
task.post("/deleteTask", controllers.deleteTask)
task.get("/allTask", controllers.getAllTasks)

export default task;