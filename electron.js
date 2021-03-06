const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");

autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

let win;

function createDefaultWindow() {
    win = new BrowserWindow({width: 900, height: 680});
    win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', () => app.quit());
    return win;
}

// when the update is ready, notify the BrowserWindow
autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('updateReady')
});

app.on('ready', function() {
  createDefaultWindow();
  autoUpdater.checkForUpdates();
});

ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})
