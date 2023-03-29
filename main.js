const { app, BrowserWindow } = require('electron');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1200,
    height: 700,
    backgroundColor: '#eaeaea'
  })
  win.loadURL(`file:///${__dirname}/dist/mosque-students-system/index.html`);

  win.on('closed', ()=>{
    win = null
  })
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', ()=>{

  if(process.platform !== 'darwin') {
    app.quit();
  }

});

app.on('activate', ()=>{
  if(win === null) {
    createWindow()
  }
})
