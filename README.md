# Sevascan (SEV) — Billetera, Nodo Tor, Minero CPU y Exchange P2P

**Sevascan (SEV)** es una criptomoneda descentralizada con privacidad Tor integrada, minería justa por CPU (`SHA3-256`, recompensa de **250 SEV / bloque**, suministro máximo **80.000.000 SEV**) y DEX P2P atómico sobre `.onion`.

---

## Descargas Oficiales (Release `v1.0.1`)

Accede a la sección **[Releases](https://github.com)** para descargar el paquete correspondiente a tu dispositivo:

| Plataforma | Archivo | Funciones incluidas |
| :--- | :--- | :--- |
| **Windows (64-bit)** | `Sevascan-Windows-v1.0.1.zip` | **Nodo completo**, **Minero CPU (`250 SEV/bloque`)**, Cold Wallet (12 palabras `sev1q...`), Explorador Tor y DEX P2P. Incluye *snapshot* inicial para sincronizar en segundos. |
| **Android (APK)** | `Sevascan-v1.0.1.apk` | **Billetera móvil ligera** (requiere **Orbot** activo), Cold Wallet (12 palabras `sev1q...`), Explorador Tor en vivo y DEX P2P. *(Nota: la app móvil **no mina** para proteger la batería y evitar sobrecalentamiento; la minería se realiza desde Windows o Linux).* |

---

## Guía Rápida de Uso

### 1. Windows (Nodo Completo + Minería CPU)
1. Descarga **`Sevascan-Windows-v1.0.1.zip`** desde [Releases](https://github.com) y descomprímelo en una carpeta (por ejemplo `C:\Sevascan`).
2. Entra en `win-unpacked` y abre **`Sevascan.exe`**.
3. Ve a **Cold Wallet (USB)** para generar o restaurar tu frase semilla de **12 palabras** (dirección nativa Bech32 `sev1q...`) y guárdala en un lugar seguro.
4. En **CPU Miner**, pulsa **Start CPU Mining** para minar bloques de **250 SEV** hacia tu dirección.

### 2. Android (Billetera Móvil Tor + Explorador)
1. Instala **[Orbot](https://orbot.app)** desde Google Play / F-Droid y pulsa **Conectar**.
2. Instala **`Sevascan-v1.0.1.apk`** desde [Releases](https://github.com).
3. Abre **Sevascan**: verás **`Tor Bridge Online`** en verde, la altura actual de la cadena y podrás restaurar tus mismas **12 palabras** para consultar o enviar `SEV` desde el móvil.
