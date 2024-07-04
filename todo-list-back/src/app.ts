import express, { NextFunction, Response } from "express";
import taskRouter from "./app/routes";
const cors = require("cors");
const compression = require("compression");
const pkgJson = require('../package.json')
const qrcode = require('qrcode-terminal');
const path = require("path");

// constantes
const PORT = 50000;
const IP = require("ip").address();


// =================================== APP CONFIG =========================================================
const app = express();
const httpServer = require("http").createServer(app);
const htmlPath = path.join(__dirname, '..', 'views')


// =================================== MIDDLEWARES =========================================================
app.use(express.urlencoded({ limit: '50mb', extended: true, }));
app.use(express.json({ limit: '50mb' }));
app.use(cors({ credentials: true, optionsSuccessStatus: 200, origin: true }));
app.use(compression());


// ============================== SOCKET.IO CONFIGURATION ==============================================
const options = {
    transports: ["websocket"],
    pingTimeout: 2500,
    pingInterval: 5000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
};
const io = require("socket.io")(httpServer, options);
const ioMiddleware = (req: any, res: Response, next: NextFunction) => {
    req.io = io;
    next();
};

app.use(ioMiddleware);
const cnxInfos = { ip: IP, port: PORT };
require("./socket/socketIO").initializeSocket(io, cnxInfos)
    .then(() => {
        console.info(`socket.io successfully initialized`)
    })
    .catch((error) => { console.log("tunnel error", error); console.error(`app.ts:61 ~ initializeSocket ~ error:", ${error}`) });


// ================================== API ROUTES =========================================================

app.use(taskRouter);

app.get("/test", (req, res, next) => {
    res.send("Hello world");
})

app.use('/', express.static(htmlPath));
app.get("/*", function (req, res) {
    res.sendFile(`${htmlPath}/index.html`);
});



//Lancement du server
const welcomeMsg = `
    ============================
    SPIDER-LOCAL-SERVER v ${pkgJson.version}
    Port: ${PORT}
    Ip: ${IP}
    Start: ${new Date().toLocaleString("fr-FR")}
    Working Dir: ${process.cwd()}
    Lauch app: http://${IP}:${PORT}
    ============================
`;

httpServer.listen(PORT, () => {
    console.log((welcomeMsg));
});

const qrValue = {
    wifi: `http://${IP}:${PORT}`,
    tunnel: 'non configuré',
}
qrcode.generate(JSON.stringify(qrValue));
