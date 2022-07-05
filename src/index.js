const { app, BrowserWindow } = require('electron')
const path = require('path')
const os = require('os-utils')
const fs = require('fs')
const logPath = path.join(__dirname, 'log.json')

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  setInterval(()=>{
    os.cpuUsage(function(v){
      // //console.log('CPU usage (%): ' + v*100);
      // mainWindow.webContents.send('cpu', v*100);
      // //console.log('Mem usage (%): ' + os.freememPercentage()*100);
      // mainWindow.webContents.send('mem', os.freememPercentage()*100);
      // //console.log('Total Mem (GB): ' + os.totalmem()/1024);
      // mainWindow.webContents.send('total-mem', os.totalmem()/1024);
      fs.readFile(logPath, 'utf-8', (err, currentJSON)=>{
        let log = JSON.parse(currentJSON)
        log[0].indications.measurements.rs.push(v*100)
        fs.writeFile(logPath, JSON.stringify(log), (err, data) => {})
      })
      mainWindow.webContents.send('cpu', v*100);

    })
  },1000)

}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
