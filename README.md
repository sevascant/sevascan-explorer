# Sevascan (SEV) — Tor-Native CPU-Only Blockchain & Desktop Wallet (v1.0.7)

Sevascan (SEV) is a decentralized, peer-to-peer proof-of-work cryptocurrency built for 100% fair CPU mining (SHA3-256, zero ASICs) and strict native Tor (`.onion`) privacy with zero exposed IP addresses.

* 💬 **Official Community Forum & Node Directory:** [Join Sevascan Discussions](https://github.com)
* 📦 **Latest Release (`v1.0.7`):** [Download for Windows & Linux](https://github.com)

---

## Key Specifications
* **Ticker:** `SEV`
* **Max Supply:** `80,000,000 SEV`
* **Block Reward:** `250 SEV` per block
* **Consensus:** Fair CPU Proof-of-Work (`SHA3-256`)
* **Network Layer:** Strict Tor v3 (`.onion`-only P2P mesh, `-onlynet=onion`) — built-in Tor daemon included
* **Address Format:** Bech32 (`sev1q...`)

---

## What's New in `v1.0.7`
* **Full Multi-Asset P2P Tor DEX:** Trade `SEV` against `USDT (ERC-20)`, `USDT (TRC-20)`, `BTC`, `LTC`, `DOGE`, `SOL`, `XMR`, and all persistent or on-chain listed Custom Coins directly over Tor `.onion`.
* **Live Market Quotes + Free P2P Pricing:** Real-time USD pricing for major external coins, custom per-SEV offer pricing in USDT/USD, and transparent `$0.01` P2P protocol fee calculation.
* **50-Block Miner Explorer:** Locally inspect the last 50 confirmed blocks with zero bandwidth overhead and see the winning miner address (`sev1q...`) for every block.
* **Strict Tor-Only Privacy (`-onlynet=onion`) & Auto-Migration:** Zero IPv4/IPv6 leaks on Windows & Linux, automatic chain snapshot migration (`#5207+`) preserving your `wallet.dat`, and built-in release update alerts.

---

## Quick Start (`v1.0.7` — 100% Automatic Setup)
1. **Download the latest release (`v1.0.7`)** from the [Releases page](https://github.com):
   * **Windows:** `Sevascan-Windows-v1.0.7.zip`
   * **Linux:** `Sevascan-Linux-v1.0.7.tar.gz`
2. **Extract and launch:**
   * **Windows:** Extract the ZIP anywhere and double-click `Sevascan.exe`.
   * **Linux:** Extract (`tar -xzf Sevascan-Linux-v1.0.7.tar.gz`) and launch the app binary.
3. **Automatic Sync & Self-Healing:**
   * No manual folder cleanup is needed—`v1.0.7` automatically migrates to the verified chain snapshot (`#5207+`) while keeping your existing `wallet.dat` untouched, starts the embedded Tor daemon (`-onlynet=onion`), and syncs to the latest block in seconds.
4. **Create Your Cold Wallet & Mine:**
   * Open **Cold Wallet (USB)** → click **Generate 12-Word Master Seed** (or restore your 12 words), save your backup, and click **Use SEV Address for Mining**.
   * Open **CPU Miner** and click **Start CPU Mining**.

---

## Active `.onion` Seed Nodes (`seeds.txt`)
```text
giqz6hmnnjbu2errnc6u73bm3jnxkd6lvorpuozwdkif367mnhq3hbqd.onion:18080
andzaivjwh3fnmrji6haltmw5qplosgbhbt2jpxcbosjifk4mxtvdkqd.onion:18080
rf5x4fmtu5blrafw6665km7nlpvio4fqxg6j3wkezjhyucqdnin4nkad.onion:18080
3rno5skgcjss7tkv2gg42ncf64cz3eplmple7uwivmafl4xmueahwaqd.onion:18080

```
