# Sevascan (SEV) — Tor Wallet, Full Node, CPU Miner & P2P DEX

**Sevascan (SEV)** is a decentralized cryptocurrency with built-in Tor privacy, fair CPU mining (`SHA3-256`, **250 SEV / block** reward, **80,000,000 SEV** max supply), and an atomic P2P DEX over `.onion`.

---

## Official Downloads (Release `v1.0.1`)

Visit the **[Releases](https://github.com)** section to download the package for your platform:

| Platform | File | Included Features |
| :--- | :--- | :--- |
| **Windows (64-bit)** | `Sevascan-Windows-v1.0.1.zip` | **Full Node**, **CPU Miner (`250 SEV/block`)**, Cold Wallet (12-word `sev1q...`), Tor Explorer & P2P DEX. Includes initial chain snapshot for fast sync. |
| **Android (APK)** | `Sevascan-v1.0.1.apk` | **Light Mobile Wallet** (requires **Orbot** active), Cold Wallet (12-word `sev1q...`), live Tor Explorer & P2P DEX. *(Note: the mobile app **does not mine** to protect battery life and prevent overheating; mining runs on Windows or Linux desktops).* |

---

## Quick Start Guide

### 1. Windows (Full Node + CPU Mining)
1. Download **`Sevascan-Windows-v1.0.1.zip`** from [Releases](https://github.com) and extract it (e.g., `C:\Sevascan`).
2. Open `win-unpacked` and run **`Sevascan.exe`**.
3. Go to **Cold Wallet (USB)** to generate or restore your **12-Word Master Seed** (native Bech32 `sev1q...` address) and back it up safely.
4. Go to **CPU Miner** and click **Start CPU Mining** to mine **250 SEV** blocks.

### 2. Android (Tor Mobile Wallet + Explorer)
1. Install **[Orbot](https://orbot.app)** from Google Play / F-Droid and tap **Connect**.
2. Install **`Sevascan-v1.0.1.apk`** from [Releases](https://github.com).
3. Open **Sevascan**: once **`Tor Bridge Online`** turns green, you can view live blocks and restore your **12-Word Master Seed** to check or send `SEV` on mobile.
