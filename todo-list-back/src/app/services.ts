import functions from "./functions"
import { ITask } from "./interface";

/**
 * Fonction pour ajouter une tâche
 * @param libTask 
 * @returns 
 */
const addTask = (libTask: string): Promise<ITask> => {
    return new Promise(async (resolve, reject) => {
        try {
            functions.addTask(libTask).then(async (idTask) => {
                resolve({ idTask, libTask })
            });
        } catch (error) {
            reject(error);
        }

    })
}

/**
 * Fonction pour mettre à jour une tâche
 * @param idTask 
 * @param libTask 
 * @returns 
 */
const updateTask = (idTask: number, libTask: string): Promise<ITask> => {
    return new Promise(async (resolve, reject) => {
        try {
            functions.updateTask(idTask, libTask).then(async (id) => {
                resolve({ idTask, libTask })
            });
        } catch (error) {
            reject(error);
        }

    })
}

/**
 * Fonction pour supprimer une tâche
 * @param idTask 
 * @returns 
 */
const deleteTask = (idTask: number): Promise<number> => {
    return new Promise(async (resolve, reject) => {
        try {
            functions.deleteTask(idTask).then(async (id) => {
                resolve(idTask)
            });
        } catch (error) {
            reject(error);
        }

    })
}

/**
 * Fonction pour récupérer toutes les tâches
 * @returns 
 */
const getAllTasks = (): Promise<ITask[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const allTask = await functions.getAllTasks() as ITask[]
            resolve(allTask)
        } catch (error) {
            reject(error);
        }

    })
}

export default {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask
}