# Sevascan (SEV) — Privacy-First Tor P2P Cryptocurrency, CPU Miner & Multi-Chain Cold Wallet

**Sevascan (SEV)** is a decentralized, privacy-first peer-to-peer cryptocurrency running natively over **Tor Hidden Services (`.onion`)** with fair **CPU-only SHA3-256 Proof-of-Work**, an integrated **Tor P2P Decentralized Exchange (DEX)**, and an offline **BIP-39 12-Word Master Cold Wallet**.

---

## Technical Specifications
* **Ticker:** `SEV`
* **Maximum Supply:** `80,000,000 SEV`
* **Block Reward:** `250 SEV` per block (fair launch from Block `#0`, zero premine)
* **Mining Algorithm:** `SHA3-256` (CPU-friendly for x86_64 PCs and ARM64 Android phones)
* **P2P Network:** Native Tor `.onion` mesh (`giqz6hmnnjbu2errnc6u73bm3jnxkd6lvorpuozwdkif367mnhq3hbqd.onion`)
* **Built-in Tor DEX:** Peer-to-peer trading for `SEV` against `USDT (ERC-20/Polygon & TRC-20)`, `BTC`, `LTC`, `DOGE`, `XMR`, and `SOL`

---

## Step-by-Step User Guide

### 1. Installation (Desktop & Android)
* **Windows / Linux / macOS:** Download or run the desktop client from `desktop-wallet/` (`npm install && npm start`). Once opened, wait a few seconds for the top status badge to turn green (**`Tor Online • Block #...`**).
* **Android (ARM64):** Download **`releases/Sevascan-v1.0.0.apk`**, allow installation from unknown sources, and open **Sevascan**. It connects to the Tor P2P network automatically.

### 2. Creating & Saving Your 12-Word Master Cold Wallet (USB / Offline)
1. Open the **`Cold Wallet (USB)`** tab.
2. Click **`Generate 12-Word Master Seed`**.
3. The app instantly generates **one single 12-word master phrase** plus deterministic addresses and private keys for **`SEV` (HD #0, #1, #2)**, **`USDT (ERC-20/Polygon)`**, **`USDT (TRC-20)`**, **`BTC`**, **`LTC`**, **`DOGE`**, **`XMR`**, and **`SOL`**.
4. Click **`Save Backup to USB (.txt)`** and store that `.txt` file on a **USB flash drive** (or write down your 12 words on paper) and unplug the USB drive.
5. *(Optional)* Click **`+ Add Custom Coin`** at any time to derive a wallet for any new ticker (e.g., `AVAX`, `TON`, `KAS`, `ZEC`) from the exact same 12 words.

### 3. Restoring Your Wallet on Any PC or Phone
1. Open **`Cold Wallet (USB)`** on your new computer or Android phone.
2. Click **`Restore from 12 Words`** and paste your **12-word master seed phrase**.
3. Every address and private key across all chains is restored identically offline—no accounts, emails, or servers required.

### 4. Mining `250 SEV` Blocks with Privacy Mode (Auto-Rotation)
1. In **`Cold Wallet (USB)`**, keep **`Auto-Rotate Address (Privacy Mode)`** checked so each block payout or incoming transfer uses a fresh derived `SEV` address (`#0 → #1 → #2...`) linked only to your 12 words.
2. Click **`Use SEV Address for Mining`** to link your public `SEV` address to the miner (your private key stays safely offline on your USB drive).
3. Go to the **`CPU Miner`** tab and click **`Start CPU Mining`**. Every valid block mined credits **`250 SEV`** directly to your address on the blockchain.

### 5. Trading `SEV` Peer-to-Peer on the Tor DEX
1. Open the **`Tor P2P DEX`** tab.
2. Choose **`Buy SEV`** or **`Sell SEV`**, enter the `SEV` amount, and select the settlement asset (**`USDT`**, **`BTC`**, **`LTC`**, **`DOGE`**, **`XMR`**, or **`SOL`**).
3. Click **`Publish P2P Order`** to broadcast your order anonymously across the Tor mesh without KYC or middlemen.
