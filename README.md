# Sevascan (SEV) — P2P Tor Cryptocurrency & Wallet

**Sevascan (SEV)** is a decentralized SHA3-256 Proof-of-Work cryptocurrency running natively over **Tor (.onion)** with a max supply of **80,000,000 SEV** and **250 SEV** block reward.

---

## Downloads (Release v1.0.0)
Go to the **[Releases Page](https://github.com)** to download the ready-to-run binaries:
* **Windows (x64 Node + GUI + CPU Miner):** `Sevascan-Windows.zip`
* **Android (Offline Cold Wallet + Node Viewer):** `Sevascan-v1.0.0.apk`

---

## Quick Start — Windows (Full Node & CPU Miner)
1. **Download & Extract:** Download `Sevascan-Windows.zip` from Releases and extract it to a folder (e.g. `C:\Sevascan`).
2. **Launch:** Open `Sevascan.exe` inside the `app` folder.
3. **Wait for Tor Sync (15–30s):** The embedded Tor daemon connects automatically to the P2P `.onion` network. Wait until the top-right badge turns green: **`Tor Node Online`**.
4. **Create Wallet & Mine:**
   * Open **Cold Wallet (USB)**, click **Generate 12-Word Master Seed**, write down your 12 words safely, and click **Use SEV Address for Mining**.
   * Open **CPU Miner** and click **Start CPU Mining**. Each block found rewards **250 SEV** (coinbase rewards mature and become spendable after **100 block confirmations**).

---

## Quick Start — Android (Mobile Cold Wallet & LAN Node Viewer)
1. **Install 1. **Install:** Download and install `Sevascan-v1.0.0.apk` on your Android device. Tor Setup:** Download and install `Sevascan-v1.0.0.apk`. To connect live to the `.onion` network over 4G/5G/Wi-Fi, install and start the free **Orbot** app (Tor for Android) before opening Sevascan.
2. **Offline Cold Wallet (Works Anywhere — 4G/5G/Wi-Fi):** Open **Cold Wallet (USB)** to generate or restore your 12-word Master Seed offline and copy your receiving `SEV` address.
3. **Optional Link to Your PC Node (Same Wi-Fi):** In the **Wallet** tab, enter your PC node bridge URL (e.g. `http://192.168.1.X:18400`) under **Remote / Tor Node Bridge URL** and tap **Save Node URL** to monitor live blocks and balance from your phone.
