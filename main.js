const { app, BrowserWindow } = require('electron');
const Main = require('electron/main');

//Criando a tela do app
app.whenReady().then(()=>{
    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    mainWindow = new BrowserWindow({width, height});
    mainWindow.loadFile("index.html");

    createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})