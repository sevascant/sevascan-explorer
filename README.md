# Sevascan (SEV) — Tor-Native CPU-Only Blockchain & Desktop Wallet (v1.0.8)

Sevascan (SEV) is a decentralized, peer-to-peer proof-of-work cryptocurrency built for 100% fair CPU mining (SHA3-256, zero ASICs) and strict native Tor (`.onion`) privacy with zero exposed IP addresses.

* 🌐 **Live Network Stats & CPU Calculator:** [sevascant.github.io](https://github.io)
* 💬 **Official Community Forum & Node Directory:** [Join Sevascan Discussions](https://github.com)
* 📦 **Latest Release (`v1.0.8`):** [Download for Windows & Linux](https://github.com)

---

## Key Specifications
* **Ticker:** `SEV`
* **Max Supply:** `80,000,000 SEV`
* **Block Reward:** `250 SEV` per block (`300`-block coinbase maturity)
* **Consensus:** Fair CPU Proof-of-Work (`SHA3-256`)
* **Network Layer:** Strict Tor v3 (`.onion`-only P2P mesh, `-onlynet=onion`) — built-in Tor daemon included
* **Address Format:** Bech32 (`sev1q...`)

---

## What's New in `v1.0.8`
* **Live P2P Tor Orderbook (`P2P Tor DEX`):** Publish, browse, and accept open `BUY` / `SELL` offers (`SEV` against `USDT`, `LTC`, `BTC`, `DOGE`, `SOL`, and custom listed coins) synchronized peer-to-peer across `.onion` nodes with built-in anti-spam protection.
* **Persistent Custom Coins Registry (`coins_registry.json`):** Add custom tokens in **Cold Wallet (USB)** with a custom USDT unit rate, saved permanently to disk and broadcast automatically to the DEX asset selector across the Tor mesh.
* **3-Color Block Maturity Explorer (`Tor Explorer`):** Real-time supply tracking (`Mined So Far` / `Remaining to Mine`) plus live color-coded tables for 🔴 **Recently Found (`1–5/300`)**, 🟡 **About to Pay (`295–299/300`)**, and 🟢 **Recently Paid (`300+/300`)** blocks.
* **Real Hardware Thread Detection & Updated `.onion` Seeds:** Displays real physical/logical CPU cores in **CPU Miner** and ships with all 5 verified Tor v3 seed nodes preconfigured.

---

## Quick Start (`v1.0.8` — 100% Automatic Setup)
1. **Download the latest release (`v1.0.8`)** from the [Releases page](https://github.com):
   * **Windows:** `Sevascan-Windows-v1.0.8.zip`
   * **Linux:** `Sevascan-Linux-v1.0.8.tar.gz`
2. **Extract and launch:**
   * **Windows:** Extract the ZIP anywhere and double-click `Sevascan.exe`.
   * **Linux:** Extract (`tar -xzf Sevascan-Linux-v1.0.8.tar.gz`) and launch `./sevascand -daemon` or the desktop binary.
3. **Automatic Sync & Self-Healing:**
   * No manual folder cleanup is needed—`v1.0.8` preserves your existing `wallet.dat`, starts the embedded Tor daemon (`-onlynet=onion`), and syncs to the latest block over `.onion` automatically.
4. **Create Your Cold Wallet & Mine:**
   * Open **Cold Wallet (USB)** → click **Generate 12-Word Master Seed** (or restore your 12 words), save your backup, and click **Use SEV Address for Mining**.
   * Open **CPU Miner** and click **Start CPU Mining**.

---

## Active `.onion` Seed Nodes (`seeds.txt`)
```text
giqz6hmnnjbu2errnc6u73bm3jnxkd6lvorpuozwdkif367mnhq3hbqd.onion:18080
andzaivjwh3fnmrji6haltmw5qplosgbhbt2jpxcbosjifk4mxtvdkqd.onion:18080
eotxt5wc4poxivypv2vkuk6wgqmehrkmqyahmnai3k6huajm4pffxzyd.onion:18080
rf5x4fmtu5blrafw6665km7nlpvio4fqxg6j3wkezjhyucqdnhn4nkad.onion:18080
3rno5skgcjss7tkv2gg42ncf64cz3eplmple7uwivmafl4xmueahwaqd.onion:18080
```

