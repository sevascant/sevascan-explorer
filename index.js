const BitcoinCore = require('bitcoin-core');
const express = require('express');
const app = express();

// Servir la interfaz web estática desde la carpeta public
app.use(express.static('public'));

// Conexión RPC local con tu nodo de Sevascan
const client = new BitcoinCore({
  host: '127.0.0.1',
  port: 18081, 
  username: 'sevascanuser',
  password: 'sevascanpassword'
});

// Endpoint para ver la altura actual (Bloque 0)
app.get('/api/status', async (req, res) => {
  try {
    const blockchainInfo = await client.getBlockchainInfo();
    res.json({
      blocks: blockchainInfo.blocks,
      difficulty: blockchainInfo.difficulty,
      chain: blockchainInfo.chain
    });
  } catch (error) {
    res.status(500).json({ error: "Nodo Sevascan desconectado o cargando" });
  }
});

app.listen(3000, () => {
  console.log('Servidor del explorador corriendo en el puerto 3000');
});
