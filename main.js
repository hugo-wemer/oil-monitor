const { exec } = require("child_process");
const { app, BrowserWindow } = require('electron');
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

//Isso aqui faz o reload a cada arquivo salvo
try {
	require('electron-reloader')(module);
} catch {}

//isso aqui executa o comando node
exec("node modbus.js", (error, stdout, stderr) => {
  
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});

