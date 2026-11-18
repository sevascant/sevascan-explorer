const express = require('express');
const http = require('http');

const app = express();
app.use((req,res,next)=>{res.header("Access-Control-Allow-Origin","*");res.header("Access-Control-Allow-Headers","Content-Type");if(req.method==="OPTIONS")return res.sendStatus(200);next();});
app.use(express.json());

const RPC_CONFIG = { host: 'localhost', port: 18081, user: 'sevascanuser', pass: 'sevascanpassword' };
let miningActive = false;
let miningAddress = '';
let blocksFoundSession = 0;
let walletReady = false;

function callRpc(method, params = []) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ jsonrpc: '1.0', id: 'sevascan-ui', method, params });
    const auth = Buffer.from(`${RPC_CONFIG.user}:${RPC_CONFIG.pass}`).toString('base64');
    const req = http.request({
      hostname: RPC_CONFIG.host, port: RPC_CONFIG.port, path: '/', family: 4, method: 'POST',
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) return reject(parsed.error);
          resolve(parsed.result);
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function ensureWallet() {
  if (walletReady) return;
  try { await callRpc('loadwallet', ['principal']); walletReady = true; }
  catch (_) {
    try { await callRpc('createwallet', ['principal']); walletReady = true; }
    catch (__) {}
  }
}

async function miningLoop() {
  while (miningActive) {
    try {
      await ensureWallet();
      if (!miningAddress || !miningAddress.startsWith('sev1')) miningAddress = await callRpc('getnewaddress', ['mineria_cpu']);
      const hashes = await callRpc('generatetoaddress', [1, miningAddress, 100000]);
      if (Array.isArray(hashes) && hashes.length > 0) blocksFoundSession += hashes.length;
    } catch (_) { await new Promise(r => setTimeout(r, 2000)); }
    await new Promise(r => setTimeout(r, 250));
  }
}

app.get('/api/node/estado', async (req, res) => {
  try {
    const [chainInfo, peers] = await Promise.all([callRpc('getblockchaininfo'), callRpc('getpeerinfo')]);
    await ensureWallet();
    let balance = 0;
    try { balance = await callRpc('getbalance'); } catch (_) {}
    if (!miningAddress) {
      try { miningAddress = await callRpc('getnewaddress', ['principal']); } catch (_) {}
    }
    res.json({
      online: true,
      blocks: chainInfo.blocks,
      bestblockhash: chainInfo.bestblockhash,
      difficulty: chainInfo.difficulty,
      balance,
      wallet_address: miningAddress,
      tor_peers: peers.length,
      peers_list: peers.map(p => ({ addr: p.addr, subver: p.subver, inbound: p.inbound })),
      mining: { active: miningActive, blocks_session: blocksFoundSession }
    });
  } catch (err) {
    res.json({ online: false, error: err.message || JSON.stringify(err) });
  }
});

app.post('/api/node/nueva-direccion', async (req, res) => {
  try {
    await ensureWallet();
    const addr = await callRpc('getnewaddress', ['usuario']);
    miningAddress = addr;
    res.json({ status: 'ok', address: addr });
  } catch (e) { res.status(500).json({ error: e.message || 'Error' }); }
});

app.post('/api/node/enviar', async (req, res) => {
  const { destino, cantidad } = req.body;
  if (!destino || !cantidad) return res.status(400).json({ error: 'Faltan datos' });
  try {
    await ensureWallet();
    const txid = await callRpc('sendtoaddress', [destino.trim(), parseFloat(cantidad)]);
    res.json({ status: 'ok', txid });
  } catch (e) { res.status(500).json({ error: e.message || 'Error al enviar' }); }
});

app.post('/api/node/minar', (req, res) => {
  const { activar } = req.body;
  if (activar && !miningActive) { miningActive = true; miningLoop(); }
  else if (!activar) { miningActive = false; }
  res.json({ status: 'ok', mining: miningActive });
});

app.get('/api/node/bloques', async (req, res) => {
  try {
    const info = await callRpc('getblockchaininfo');
    const height = info.blocks || 0;
    const end = Math.max(0, height - 11);
    const list = [];
    for (let h = height; h >= end; h--) {
      const bhash = await callRpc('getblockhash', [h]);
      const blk = await callRpc('getblock', [bhash, 2]);
      let reward = 0, dest = 'Coinbase / Local';
      if (blk.tx && blk.tx.length > 0 && blk.tx[0].vout) {
        for (const out of blk.tx[0].vout) {
          reward += (out.value || 0);
          const spk = out.scriptPubKey || {};
          const addr = spk.address || (spk.addresses && spk.addresses[0]);
          if (addr && out.value > 0) dest = addr;
        }
      }
      list.push({
        height: h, hash: bhash, txCount: (blk.tx || []).length,
        time: blk.time || 0, reward, dest, size: blk.size || 0, diff: blk.difficulty || 0
      });
    }
    res.json({ status: 'ok', blocks: list });
  } catch (e) { res.json({ status: 'error', blocks: [] }); }
});

app.listen(18400, 'localhost', () => console.log('Sevascan Node Bridge activo en localhost:18400'));
