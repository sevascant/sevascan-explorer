const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { SocksProxyAgent } = require('socks-proxy-agent');

const app = express();
app.use(express.json());

const REGISTRY_PATH = path.join(__dirname, 'coins_registry.json');
const torAgent = new SocksProxyAgent('socks5h://127.0.0.1:19050');

function loadRegistry() {
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
}

function saveRegistry(data) {
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function calculateMarketRates(registry) {
  const sevUsdt = registry.sev_price_usdt;
  const rates = {};
  for (const [symbol, info] of Object.entries(registry.supported_coins)) {
    if (info.enabled && info.usdt_rate > 0) {
      rates[symbol] = Number((sevUsdt / info.usdt_rate).toFixed(info.decimals));
    }
  }
  return rates;
}

// Obtener lista de nodos .onion conectados a nuestro nodo local
function getConnectedOnionPeers(seedOnion) {
  return new Promise((resolve) => {
    const onions = new Set();
    if (seedOnion) onions.add(seedOnion.replace(':18080', ''));
    const req = http.get({ hostname: '127.0.0.1', port: 18400, path: '/api/node/estado', family: 4, timeout: 2000 }, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try {
          const data = JSON.parse(raw);
          if (Array.isArray(data.peers_list)) {
            data.peers_list.forEach(p => {
              if (p.addr && p.addr.includes('.onion')) {
                onions.add(p.addr.split(':')[0]);
              }
            });
          }
        } catch (_) {}
        resolve(Array.from(onions));
      });
    });
    req.on('error', () => resolve(Array.from(onions)));
  });
}

// Difundir actualización de precio y monedas por la malla P2P de Tor
async function broadcastDexUpdate(registry) {
  const peers = await getConnectedOnionPeers(registry.seed_onion);
  const payload = JSON.stringify({
    sev_price_usdt: registry.sev_price_usdt,
    supported_coins: registry.supported_coins
  });

  for (const onionHost of peers) {
    try {
      const req = http.request({
        hostname: onionHost,
        port: 18500,
        path: '/api/dex/sync',
        method: 'POST',
        agent: torAgent,
        timeout: 8000,
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
      }, (res) => { res.resume(); });
      req.on('error', () => {});
      req.write(payload);
      req.end();
    } catch (_) {}
  }
}

// Sincronización periódica con la red Tor cada 30 segundos
async function pullFromTorNetwork() {
  const registry = loadRegistry();
  const peers = await getConnectedOnionPeers(registry.seed_onion);
  for (const onionHost of peers) {
    try {
      const req = http.get({
        hostname: onionHost,
        port: 18500,
        path: '/api/dex/precio',
        agent: torAgent,
        timeout: 8000
      }, (res) => {
        let raw = '';
        res.on('data', c => raw += c);
        res.on('end', () => {
          try {
            const remote = JSON.parse(raw);
            if (remote.status === 'success') {
              const local = loadRegistry();
              let changed = false;
              if (remote.sev_price_usdt > local.sev_price_usdt) {
                local.sev_price_usdt = remote.sev_price_usdt;
                changed = true;
              }
              if (remote.supported_coins) {
                for (const [sym, info] of Object.entries(remote.supported_coins)) {
                  if (!local.supported_coins[sym]) {
                    local.supported_coins[sym] = info;
                    changed = true;
                  }
                }
              }
              if (changed) saveRegistry(local);
            }
          } catch (_) {}
        });
      });
      req.on('error', () => {});
    } catch (_) {}
  }
}

setInterval(pullFromTorNetwork, 30000);

app.get('/api/dex/precio', (req, res) => {
  const registry = loadRegistry();
  res.json({
    status: 'success',
    base_currency: registry.base_token,
    sev_price_usdt: Number(registry.sev_price_usdt.toFixed(3)),
    market_rates: calculateMarketRates(registry),
    supported_coins: registry.supported_coins
  });
});

// Endpoint P2P que recibe actualizaciones de otros nodos .onion
app.post('/api/dex/sync', (req, res) => {
  const { sev_price_usdt, supported_coins } = req.body;
  const local = loadRegistry();
  let changed = false;

  if (typeof sev_price_usdt === 'number' && sev_price_usdt > local.sev_price_usdt) {
    local.sev_price_usdt = Number(sev_price_usdt.toFixed(3));
    changed = true;
  }
  if (supported_coins && typeof supported_coins === 'object') {
    for (const [sym, info] of Object.entries(supported_coins)) {
      if (!local.supported_coins[sym] && info && info.usdt_rate > 0) {
        local.supported_coins[sym] = info;
        changed = true;
      }
    }
  }
  if (changed) {
    saveRegistry(local);
    broadcastDexUpdate(local);
  }
  res.json({ status: 'ok', sev_price_usdt: local.sev_price_usdt });
});

app.post('/api/dex/intercambio', (req, res) => {
  const { monedaOrigen, monedaDestino, cantidadOrigen, direccionDestino, txidRespaldo } = req.body;
  if (!monedaOrigen || !monedaDestino || !cantidadOrigen || !direccionDestino) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para el intercambio' });
  }

  const registry = loadRegistry();
  const orig = monedaOrigen.toLowerCase();
  const dest = monedaDestino.toLowerCase();

  if (orig !== 'sev' && dest !== 'sev') {
    const coinA = registry.supported_coins[orig];
    const coinB = registry.supported_coins[dest];
    if (!coinA || !coinB) return res.status(400).json({ error: 'Moneda no soportada' });

    const valorEnUsdt = parseFloat(cantidadOrigen) * coinA.usdt_rate;
    const sevIntermedios = valorEnUsdt / registry.sev_price_usdt;
    registry.sev_price_usdt = Number((registry.sev_price_usdt + registry.increment_per_tx_usdt).toFixed(3));
    const cantidadFinalB = (sevIntermedios * registry.sev_price_usdt) / coinB.usdt_rate;
    registry.sev_price_usdt = Number((registry.sev_price_usdt + registry.increment_per_tx_usdt).toFixed(3));

    saveRegistry(registry);
    broadcastDexUpdate(registry);

    return res.json({
      status: 'ok',
      route: `${orig.toUpperCase()} -> SEV -> ${dest.toUpperCase()}`,
      sev_bridged: Number(sevIntermedios.toFixed(6)),
      received_amount: Number(cantidadFinalB.toFixed(coinB.decimals)),
      new_sev_price_usdt: registry.sev_price_usdt,
      market_rates: calculateMarketRates(registry)
    });
  }

  const externalCoinKey = orig === 'sev' ? dest : orig;
  const externalCoin = registry.supported_coins[externalCoinKey];
  if (!externalCoin) return res.status(400).json({ error: 'Moneda externa no registrada' });

  let cantidadRecibida = 0;
  if (orig === 'sev') {
    cantidadRecibida = (parseFloat(cantidadOrigen) * registry.sev_price_usdt) / externalCoin.usdt_rate;
  } else {
    const valorUsdt = parseFloat(cantidadOrigen) * externalCoin.usdt_rate;
    cantidadRecibida = valorUsdt / registry.sev_price_usdt;
  }

  registry.sev_price_usdt = Number((registry.sev_price_usdt + registry.increment_per_tx_usdt).toFixed(3));
  saveRegistry(registry);
  broadcastDexUpdate(registry);

  res.json({
    status: 'ok',
    route: `${orig.toUpperCase()} -> ${dest.toUpperCase()}`,
    received_amount: Number(cantidadRecibida.toFixed(orig === 'sev' ? externalCoin.decimals : 6)),
    txid_ref: txidRespaldo || 'P2P-TOR-LOCAL',
    new_sev_price_usdt: registry.sev_price_usdt,
    market_rates: calculateMarketRates(registry)
  });
});

app.post('/api/dex/registrar-moneda', (req, res) => {
  const { symbol, name, usdt_rate, decimals } = req.body;
  if (!symbol || !name || !usdt_rate) {
    return res.status(400).json({ error: 'Indica symbol, name y usdt_rate' });
  }
  const registry = loadRegistry();
  registry.supported_coins[symbol.toLowerCase()] = {
    name,
    usdt_rate: parseFloat(usdt_rate),
    decimals: parseInt(decimals || 6, 10),
    enabled: true
  };
  saveRegistry(registry);
  broadcastDexUpdate(registry);
  res.json({ status: 'ok', supported_coins: registry.supported_coins });
});


const httpRpc = require("http");
function rpcLocal(method, params = []) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ jsonrpc: "1.0", id: "light", method, params });
    const req = httpRpc.request({
      hostname: "127.0.0.1", port: 18081, path: "/", method: "POST",
      auth: "sevascanuser:sevascanpassword",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) }
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => { try { resolve(JSON.parse(data).result); } catch { resolve(null); } });
    });
    req.on("error", () => resolve(null));
    req.write(body); req.end();
  });
}

app.get("/api/miner/light-status", async (req, res) => {
  const blocks = await rpcLocal("getblockcount");
  const peers = await rpcLocal("getconnectioncount");
  res.json({ status: "ok", blocks: blocks ?? -1, peers: peers ?? 1, onion: "giqz6hmnnjbu2errnc6u73bm3jnxkd6lvorpuozwdkif367mnhq3hbqd.onion" });
});

app.get("/api/blocks", async (req, res) => {
  const height = await rpcLocal("getblockcount");
  if (height === null) return res.json({ status: "error", blocks: [] });
  const list = [];
  for (let h = height; h >= Math.max(0, height - 14); h--) {
    const hash = await rpcLocal("getblockhash", [h]);
    if (!hash) continue;
    const blk = await rpcLocal("getblock", [hash]);
    if (blk) list.push({ height: blk.height, hash: blk.hash, txCount: (blk.tx || []).length, time: blk.time });
  }
  res.json({ status: "ok", blocks: list });
});

app.get("/api/peers", async (req, res) => {
  const info = await rpcLocal("getpeerinfo");
  const peers = new Set(["giqz6hmnnjbu2errnc6u73bm3jnxkd6lvorpuozwdkif367mnhq3hbqd.onion"]);
  if (Array.isArray(info)) info.forEach(p => { if (p.addr && p.addr.includes(".onion")) peers.add(p.addr.split(":")[0]); });
  res.json({ status: "ok", peers: Array.from(peers) });
});

app.post("/api/miner/work", async (req, res) => {
  const addr = (req.body && req.body.address) || "";
  const tries = Math.min(Number((req.body && req.body.tries) || 5000), 25000);
  let found = 0;
  if (addr) {
    console.log("MINT_REQ:", addr, tries); const mined = await rpcLocal("generatetoaddress", [1, addr, tries]); console.log("MINT_RES:", JSON.stringify(mined));
    if (Array.isArray(mined)) found = mined.length;
  }
  const blocks = await rpcLocal("getblockcount");
  res.json({ status: "ok", found, blocks: blocks ?? -1 });
});


app.get("/api/miner/blocks", async (req, res) => {
  const height = await rpcLocal("getblockcount");
  if (height === null) return res.json({ status: "error", blocks: [] });
  const list = [];
  for (let h = height; h >= Math.max(0, height - 14); h--) {
    const hash = await rpcLocal("getblockhash", [h]);
    if (!hash) continue;
    const blk = await rpcLocal("getblock", [hash]);
    if (blk) list.push({
      height: blk.height,
      hash: blk.hash,
      txCount: (blk.tx || []).length,
      time: blk.time,
      reward: 50.0,
      dest: "Coinbase / Tor",
      size: blk.size || 250,
      diff: blk.difficulty || 1.0
    });
  }
  res.json({ status: "ok", blocks: list });
});

app.get("/api/miner/peers", async (req, res) => {
  const info = await rpcLocal("getpeerinfo");
  const peers = new Set(["giqz6hmnnjbu2errnc6u73bm3jnxkd6lvorpuozwdkif367mnhq3hbqd.onion"]);
  if (Array.isArray(info)) info.forEach(p => { if (p.addr && p.addr.includes(".onion")) peers.add(p.addr.split(":")[0]); });
  res.json({ status: "ok", peers: Array.from(peers) });
});

app.post("/api/miner/mobile-work", async (req, res) => {
  let addr = String((req.body && req.body.address) || "").trim();
  if (!addr) addr = (await rpcLocal("getnewaddress")) || "";
  let found = 0;
  const start = Date.now();
  while (addr && found === 0 && (Date.now() - start) < 20000) {
    const mined = await rpcLocal("generatetoaddress", [1, addr, 10000000]);
    if (Array.isArray(mined) && mined.length > 0) { found = mined.length; break; }
  }
  const blocks = await rpcLocal("getblockcount");
  res.json({ status: "ok", found, blocks: blocks ?? 0, addr });
});

app.listen(18500, '127.0.0.1', () => {
  console.log('Sevascan DEX P2P Tor activo en 127.0.0.1:18500');
});
