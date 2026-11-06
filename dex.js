const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let sevascanPrices = { usdt: 25.00, ltc: 0.43, btc: 0.00027, doge: 42.30 };
const MARKET_INCREMENT = 0.01;

app.post('/api/dex/intercambio', async (req, res) => {
  const { direccionSevascan, cantidad, txidRespaldo, monedaPago, precio, usdtDestinoVendedor } = req.body;
  if (!direccionSevascan || !cantidad || !txidRespaldo || !monedaPago || !precio) {
    return res.status(400).json({ error: "Incomplete data" });
  }
  try {
    let executionPrice = parseFloat(precio);
    if (!isNaN(executionPrice) && executionPrice > 0) {
      sevascanPrices[monedaPago] = executionPrice + MARKET_INCREMENT;
    } else {
      sevascanPrices[monedaPago] += MARKET_INCREMENT;
    }
    res.json({ status: "ok", new_prices: sevascanPrices });
  } catch (error) {
    res.status(500).json({ error: "Swap failed" });
  }
});

app.get('/api/dex/precio', (req, res) => {
  res.json({ status: "success", base_currency: "SEV", market_rates: sevascanPrices });
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`DEX active on port ${PORT}`);
});
