const electron = require("electron");
// 控制应用生命周期的模块
const {app} = electron;
// 创建原生浏览器窗口的模块
const {BrowserWindow} = electron;
//保持一个对于window对象的全局引用，如果你不这样做，
//当JavaScript对象被垃圾回收，window会被自动地关闭
let mainWindow;
function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({width:800, height:600});
  // 加载应用的index.html
  mainWindow.loadURL(__dirname+"/index.html");
  // 启用开发工具
  mainWindow.webContents.openDevTools();
  // 当window被关闭，这个事件会被触发
  mainWindow.on("closed", () => {
    // 取消引用window对象，如果你的应用支持多窗口的话，
    // 通常会把多个window对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素
    mainWindow = null;
  });
}
// 此方法在Electron完成初始化且准备创建浏览器窗口时会被触发
// 有些API只有在这个事件发生后才能被使用
app.on("ready", createWindow);
// 当所有窗口关闭时退出
app.on("window-all-closed", () => {
  // 对于macOS来说，菜单栏中的应用通常会一直保持运行，直到用户通过Cmd+Q来直接退出
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  // 在macOS中，如果没有开启其他窗口，通常可以点击程序图标来再次创建一个应用的窗口
  if (mainWindow === null) {
    createWindow();
  }
});
// 你可以在本文件加入你应用中剩下具体的主进程代码，也可以把代码放到独立的文件中，在这里调用它们
