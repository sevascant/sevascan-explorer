# Sevascan (SEV) — Tor Wallet, Full Node, CPU Miner & P2P DEX

> ⚠️ **MANDATORY CONSENSUS UPDATE (`v1.0.3`):** All Windows miners and nodes must update to **`Sevascan-Windows-v1.0.3.zip`** to stay on the main canonical chain (`#3473+`). Includes automatic Tor P2P seed sync, live Pending wallet balance, and anti-fork mining protection.

**Sevascan (SEV)** is a decentralized cryptocurrency with built-in Tor privacy, fair CPU mining (`SHA3-256`, **250 SEV / block** reward, **80,000,000 SEV** max supply), and an atomic P2P DEX over `.onion`.

---

## Official Downloads (Latest Release `v1.0.3`)

Visit the **[Releases](https://github.com/sevascant/sevascan-explorer/releases)** section to download the package for your platform:

| Platform | File | Included Features |
| :--- | :--- | :--- |
| **Windows (64-bit)** | `Sevascan-Windows-v1.0.3.zip` | **Full Node**, **CPU Miner (`250 SEV/block`)**, Cold Wallet (12-word `sev1q...`), Tor Explorer & P2P DEX. Includes synced chain snapshot (`#3473+`), live Pending balance & anti-fork P2P mesh. |
| **Linux (64-bit)** | `Sevascan-Linux-v1.0.3.tar.gz` | **Full Node**, **CPU Miner (`250 SEV/block`)**, Cold Wallet (12-word `sev1q...`), Tor Explorer & P2P DEX. Run `./Sevascan.sh`. |
| **Android (APK)** | `Sevascan-v1.0.1.apk` | **Light Mobile Wallet** (requires **Orbot** active), Cold Wallet (12-word `sev1q...`), live Tor Explorer & P2P DEX. *(Does not mine on mobile to protect battery life).* |
| **Apple (iOS / macOS)** | `Sevascan-Apple-iOS-macOS-PWA-v1.0.1.zip` | **Progressive Web App (PWA)** for Safari on iPhone, iPad & Mac (use **Onion Browser** / Tor on iOS + *"Add to Home Screen"*). Supports 12-word `sev1q...` Cold Wallet, live Explorer & P2P DEX. *(No mining on iOS).* |

---

## Quick Start & Upgrade Guide

### 1. Upgrading from `v1.0.1` / `v1.0.2` to `v1.0.3` (Windows)
1. Close your old Sevascan client completely.
2. Open `%APPDATA%\sevascan-desktop\sevascan_chain\` and delete **only** the old `blocks` and `chainstate` folders (**DO NOT delete your `wallets` folder or `wallet.dat`!**).
3. Extract **`Sevascan-Windows-v1.0.3.zip`** and launch **`Sevascan.exe`** to connect straight onto the canonical chain (`#3473+`).

### 2. New Users — Windows & Linux (Full Node + CPU Mining)
1. Download **`Sevascan-Windows-v1.0.3.zip`** or **`Sevascan-Linux-v1.0.3.tar.gz`** from [Releases](https://github.com/sevascant/sevascan-explorer/releases) and extract it.
2. Launch **`Sevascan.exe`** (Windows) or **`./Sevascan.sh`** (Linux).
3. Go to **Cold Wallet (USB)** to generate or restore your **12-Word Master Seed** (native Bech32 `sev1q...` address) and back it up safely.
4. Go to **CPU Miner** and click **Start CPU Mining** to mine **250 SEV** blocks (requires at least 3 active peers on the network).

### 3. Android & Apple iOS / macOS (Tor Light Wallet + Explorer)
* **Android:** Install **[Orbot](https://orbot.app)**, connect Tor, and install **`Sevascan-v1.0.1.apk`**.
* **iPhone / iPad / Mac:** Open the PWA in **Onion Browser** (iOS) or **Tor Browser / Safari** (macOS) and tap **Share -> Add to Home Screen** to install the native app icon.
