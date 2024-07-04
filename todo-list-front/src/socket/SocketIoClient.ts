import { store } from "../stores/store";
import { ITask, addTask, deleteTask, updateTask } from "../stores/taskSlice";
import io from "socket.io-client";
import { BASE_URL } from "../utils/constants";


export interface IServerConnectionInfos {
    ip: string;
    port: number;
    socketID?: string;
}

const socketIO = {
    initialize: () => {
        const query = {
            type: "webClient",
        };

        // @ts-ignore
        const socket = io(BASE_URL, { transports: ["websocket"], query: query });

        //  à la connexion
        socket.on("connected", (cnxInfos: any) => {
            console.log("🚀 ~ Socket connecté avec succès", cnxInfos)
        });

        socket.on('addTask', (data: ITask) => {
            store.dispatch(addTask(data))
        });
        socket.on('updateTask', (data: ITask) => {
            store.dispatch(updateTask(data))
        });
        socket.on('deleteTask', (idTask: number) => {
            store.dispatch(deleteTask(idTask))
        });

    },
};

export default socketIO;