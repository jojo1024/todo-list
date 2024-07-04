import { Socket } from "socket.io";
// import { IDevice } from "../client/store/appSlice";




export const initializeSocket = (io, cnxInfos): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            io.on("connection", async (socket: Socket) => {
                /**
                 * Toutes les applications qui vont se connecter au serveur
                 * doivent fournir un objet contenant des informations sur
                 * le device, l'application, l'utilisateur... lors de  l'initialisation
                 * de leur socket.io-client.
                 * Ces informations sont récupérée ici avec socket.handshake.query
                 */

          
                const socketCnxInfos = {
                    ...cnxInfos,
                    socketID: socket.id,
                };

                io.to(socket.id).emit("connected", socketCnxInfos);

        

                /** FIN SOCKET SCHOOL CONTROL */



                socket.on('disconnect', () => {
                    console.log("SOCKET DISONNCET+++")
                })
            });

            resolve(true);
        } catch (error) {
            console.log("🚀 ~ file: socketIO.ts:50 ~ returnnewPromise<boolean> ~ error:", error)
            reject(error)
        }
    });
};


