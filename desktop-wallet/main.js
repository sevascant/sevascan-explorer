const { app, BrowserWindow } = require('electron');
const { spawn, execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); process.exit(0); }
process.on("uncaughtException", (err) => { console.error("Sevascan notice:", err.message); });

let torProcess = null;
let nodeProcess = null;
let mainWindow = null;

const isWin = process.platform === 'win32';
const isMac = process.platform === 'darwin';
const platformDir = isWin ? 'windows' : (isMac ? 'mac' : 'linux');

const basePath = app.isPackaged ? process.resourcesPath : __dirname;
const binDir = path.join(basePath, 'bin', platformDir);
const dataDir = path.join(app.getPath('userData'), 'sevascan_chain');
const torDataDir = path.join(app.getPath('userData'), 'tor_data');
const torHsDir = path.join(app.getPath('userData'), 'tor_dex_hs');

function startBackgroundServices() {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(torDataDir, { recursive: true });
  fs.mkdirSync(torHsDir, { recursive: true });

  // 1. Arrancar Tor portátil con servicio oculto .onion para el DEX P2P
  const torBin = path.join(binDir, isWin ? 'tor.exe' : 'tor');
  const torArgs = [
    '--SocksPort', '19050',
    '--DataDirectory', torDataDir,
    '--HiddenServiceDir', torHsDir,
    '--HiddenServicePort', '18500 127.0.0.1:18500'
  ];
  if (fs.existsSync(torBin)) {
    torProcess = spawn(torBin, torArgs, { stdio: 'ignore', windowsHide: true }); torProcess.on('error', (e) => console.log('Tor skipped:', e.code));
  } else {
    torProcess = spawn('tor', torArgs, { stdio: 'ignore', windowsHide: true });
  }

  // 2. Arrancar Nodo Completo Sevascan 100% por Tor
  const daemonBin = path.join(binDir, isWin ? 'sevascand.exe' : 'sevascand');
  const daemonArgs = [
    `-datadir=${dataDir}`,
    '-server=1',
    '-rpcbind=127.0.0.1',
    '-rpcallowip=127.0.0.1',
    '-rpcport=18081',
    '-rpcuser=sevascanuser',
    '-rpcpassword=sevascanpassword',
    '-listen=1',
    '-port=18080',
    '-onlynet=onion',
    '-proxy=127.0.0.1:19050',
    '-listenonion=1',
    '-discover=1',
    '-addnode=giqz6hmnnjbu2errnc6u73bm3jnxkd6lvorpuozwdkif367mnhq3hbqd.onion:18080'
  ];

  if (fs.existsSync(daemonBin)) {
    nodeProcess = spawn(daemonBin, daemonArgs, { stdio: 'ignore', windowsHide: true }); nodeProcess.on('error', (e) => console.log('Daemon skipped:', e.code));
  }

  // 3. Arrancar servidores locales Explorer/Wallet (18400) y DEX P2P Tor (18500)
  require(path.join(__dirname, 'explorer', 'node_bridge.js'));
  require(path.join(__dirname, 'dex', 'dex_server.js'));
}

function stopBackgroundServices() {
  const cliBin = path.join(binDir, isWin ? 'sevascan-cli.exe' : 'sevascan-cli');
  if (fs.existsSync(cliBin)) {
    try {
      execFile(cliBin, [`-datadir=${dataDir}`, '-rpcport=18081', '-rpcuser=sevascanuser', '-rpcpassword=sevascanpassword', 'stop']);
    } catch (_) {}
  }
  if (nodeProcess) { try { nodeProcess.kill(); } catch (_) {} }
  if (torProcess) { try { torProcess.kill(); } catch (_) {} }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 780,
    title: 'Sevascan (SEV) — Billetera, Nodo Tor, Minero y Exchange P2P',
    icon: path.join(__dirname, 'assets', 'logo.png'),
    backgroundColor: '#0b0f19',
    webPreferences: { nodeIntegration: false, contextIsolation: true }
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => { createWindow(); try { startBackgroundServices(); } catch (e) { console.error("BG Error:", e); } });
app.on('before-quit', stopBackgroundServices);
app.on('window-all-closed', () => { stopBackgroundServices(); app.quit(); });
