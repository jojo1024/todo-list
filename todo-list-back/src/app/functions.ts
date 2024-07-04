import { _executeSql, _selectSql } from "../database";

const addTask = (libTask: string): Promise<number> => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `INSERT INTO task (libTask) VALUES (?)`;
            const taskInserted: any = await _executeSql(sql, [libTask]);
            resolve(taskInserted.insertId);
        } catch (error) {
            reject(error);
        }
    })
}

const updateTask = (idTask: number, libTask: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `UPDATE task SET libTask = ? WHERE idTask = ?`;
            await _executeSql(sql, [libTask, idTask]);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    })
}

const deleteTask = (idTask: number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `DELETE FROM task WHERE idtask = ?`;
            await _executeSql(sql, [idTask]);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    })
}

const getAllTasks = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sql = `SELECT * FROM task  ORDER BY idTask DESC`;
            const data = await _selectSql(sql, []);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}
export default {
    addTask,
    updateTask,
    deleteTask,
    getAllTasks
}