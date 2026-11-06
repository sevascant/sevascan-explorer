const express = require('express');
const app = express();
const path = require('path');

// Servir el index.html legítimo del explorador
app.use(express.static(path.join(__dirname, 'public_dex')));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public_dex', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sevascan Blockchain Explorer activo en puerto ${PORT}`);
});
