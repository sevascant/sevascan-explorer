# Sevascan (SEV) — Tor Wallet, Full Node, CPU Miner & P2P DEX

**Sevascan (SEV)** is a decentralized cryptocurrency with built-in Tor privacy, fair CPU mining (`SHA3-256`, **250 SEV / block** reward, **80,000,000 SEV** max supply), and an atomic P2P DEX over `.onion`.

---

## Official Downloads (Release `v1.0.2`)

Visit the **[Releases](https://github.com)** section to download the package for your platform:

| Platform | File | Included Features |
| :--- | :--- | :--- |
| **Windows (64-bit)** | `Sevascan-Windows-v1.0.2.zip` | **Full Node**, **CPU Miner (`250 SEV/block`)**, Cold Wallet (12-word `sev1q...`), Tor Explorer & P2P DEX. Includes initial chain snapshot for instant sync & autonomous Tor P2P mesh. |
| **Linux (64-bit)** | `Sevascan-Linux-v1.0.2.tar.gz` | **Full Node**, **CPU Miner (`250 SEV/block`)**, Cold Wallet (12-word `sev1q...`), Tor Explorer & P2P DEX. Run `./Sevascan.sh`. |
| **Android (APK)** | `Sevascan-v1.0.1.apk` | **Light Mobile Wallet** (requires **Orbot** active), Cold Wallet (12-word `sev1q...`), live Tor Explorer & P2P DEX. *(Does not mine on mobile to protect battery life).* |
| **Apple (iOS / macOS)** | `Sevascan-Apple-iOS-macOS-PWA-v1.0.1.zip` | **Progressive Web App (PWA)** for Safari on iPhone, iPad & Mac (use **Onion Browser** / Tor on iOS + *"Add to Home Screen"*). Supports 12-word `sev1q...` Cold Wallet, live Explorer & P2P DEX. *(No mining on iOS).* |

---

## Quick Start Guide

### 1. Windows & Linux (Full Node + CPU Mining)
1. Download **`Sevascan-Windows-v1.0.2.zip`** or **`Sevascan-Linux-v1.0.2.tar.gz`** from [Releases](https://github.com) and extract it.
2. Launch **`Sevascan.exe`** (Windows) or **`./Sevascan.sh`** (Linux).
3. Go to **Cold Wallet (USB)** to generate or restore your **12-Word Master Seed** (native Bech32 `sev1q...` address) and back it up safely.
4. Go to **CPU Miner** and click **Start CPU Mining** to mine **250 SEV** blocks.

### 2. Android & Apple iOS / macOS (Tor Light Wallet + Explorer)
* **Android:** Install **[Orbot](https://orbot.app)**, connect Tor, and install **`Sevascan-v1.0.1.apk`**.
* **iPhone / iPad / Mac:** Open the PWA in **Onion Browser** (iOS) or **Tor Browser / Safari** (macOS) and tap **Share -> Add to Home Screen** to install the native app icon.
