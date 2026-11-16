const BitcoinCore = require('bitcoin-core');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const client = new BitcoinCore({
  host: '127.0.0.1',
  port: 18081,
  username: 'sevascanuser',
  password: 'sevascanpassword'
});

app.get('/api/status', async (req, res) => {
  try {
    const blockchainInfo = await client.getBlockchainInfo();
    const networkInfo = await client.getNetworkInfo();
    const miningInfo = await client.getMiningInfo();

    const latestBlocks = [];
    const startHeight = blockchainInfo.blocks;
    const endHeight = Math.max(0, startHeight - 9);

    for (let h = startHeight; h >= endHeight; h--) {
      const hash = await client.getBlockHash(h);
      const block = await client.getBlock(hash);
      latestBlocks.push({
        height: block.height,
        hash: block.hash,
        time: block.time,
        txCount: block.tx ? block.tx.length : 1,
        difficulty: block.difficulty
      });
    }

    res.json({
      success: true,
      blocks: blockchainInfo.blocks,
      difficulty: blockchainInfo.difficulty,
      networkhashps: miningInfo.networkhashps || 0,
      connections: networkInfo.connections,
      chain: blockchainInfo.chain,
      latestBlocks
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Nodo Sevascan desconectado" });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0', () => {
  console.log(`Sevascan Blockchain Explorer activo en el puerto ${PORT}`);
});
