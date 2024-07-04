import { Request, Response, Errback } from "express";
import services from "./services";


const getAllTasks = (req: Request, res: Response) => {
    services
        .getAllTasks()
        .then((result: any) => {
            res.status(200).send({ status: 1, data: result });

        })
        .catch((error: any) => res.status(400).send({ status: 0, error }))
}
const addTask = (req: Request, res: Response) => {
    const {libTask} = req.body
    services
        .addTask(libTask)
        .then((result: any) => {
            (req as any).io.emit("addTask", result)
            res.status(200).send({ status: 1, data: result });

        })
        .catch((error: any) => res.status(400).send({ status: 0, error }))
}

const deleteTask = (req: Request, res: Response) => {
    const {idTask} = req.body
    services
        .deleteTask(idTask)
        .then((result: any) => {
            (req as any).io.emit("deleteTask", result)
            res.status(200).send({ status: 1, data: result });
        })
        .catch((error: any) => res.status(400).send({ status: 0, error }))
}

const updateTask = (req: Request, res: Response) => {
    const {idTask, libTask} = req.body
    services
        .updateTask(idTask, libTask)
        .then((result: any) => {
            (req as any).io.emit("updateTask", result)
            res.status(200).send({ status: 1, data: result });
        })
        .catch((error: any) => res.status(400).send({ status: 0, error }))
}

export default {
    addTask,
    updateTask,
    deleteTask,
    getAllTasks,
}