const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        resizable: true, // Made responsive as requested
        webPreferences: {
            nodeIntegration: false, // Better security
            contextIsolation: true,
            devTools: false // Disable dev tools for production feel
        },
        title: "Aesthera CRM",
        backgroundColor: '#000000', // Matches your "True Black" theme
    });

    // Hide the default menu bar
    Menu.setApplicationMenu(null);

    // Load the live URL directly
    mainWindow.loadURL('https://crm.aesthera.tech/login');

    // Disable right-click for a more native app feel
    mainWindow.webContents.on('context-menu', (e) => {
        e.preventDefault();
    });

    // Handle window close
    mainWindow.on('closed', function () {
        app.quit();
    });
}

// Initialize the app
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
