const { app, BrowserWindow, ipcMain } = require("electron");
const ipc = ipcMain

let appWin;

function createWindow() {
    appWin = new BrowserWindow({
        minWidth: 600,
        minHeight: 400,
        width: 900,
        height: 600,
        title: "iMan",
        resizable: true,
        frame: true,
        icon: "src/favicon.ico",
        webPreferences: {

            // SECURITY -> set to false
            // CONTROL BUTTONS -> set to true
            nodeIntegration: true,

            // SECURITY -> set to true
            // CONTROL BUTTONS -> set to false
            contextIsolation: false,

            // open devTools -> Inspector...
            devTools: false
        }
    });

    appWin.maximize()
    appWin.loadURL(`file://${__dirname}/dist/footmatch-frontend/index-electron.html`);
    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });

    ipc.on('minimizeApp', () => {
        appWin.minimize();
    })

    ipc.on('maximizeApp', () => {
        if (appWin.isMaximized()) {
            appWin.unmaximize();
        } else {
            appWin.maximize();
        }
    })

    ipc.on('closeApp', () => {
        appWin.close();
    })

}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
