## 🚀 Run in GitHub Codespaces (Full Guide)


https://github.com/user-attachments/assets/e0c54480-b476-4d3d-a799-c583f70a7d40


Follow these steps to fork, star ⭐, and run this project inside GitHub Codespaces:

---

### 🌟 1. Fork & Star the Repo

1. Click the `⭐ Star` button on top of this repo to support the project.
2. Click `🔱 Fork` (top-right) to create your own copy of this repo.

---

### 👨‍💻 2. Open in GitHub Codespaces

1. Go to your forked repository.
2. Click the green `<> Code` button.
3. Select the `Codespaces` tab.
4. Click `➕ Create codespace on main`.

This will open a VS Code environment in your browser with everything pre-installed.

---

### 🧰 3. Setup & Run the Tool

Inside the Codespace terminal (already open at the bottom):

```bash
chmod +x script.sh
./script.sh
```

This will:
- Install Node.js if missing
- Install all required dependencies via `npm`
- Open the interactive menu interface

From there, you can:
- Generate Sui wallets
- Run your whitelist automation script
- View wallets and proxies

---

### 💾 4. Save Your Wallets & Keys

Once you generate wallets:
- `address.txt` will contain your public addresses
- `private.txt` will store private keys

⚠️ **Make sure to copy & save these files locally if needed.**

---

## 🧪 Usage

### 💠 Script Options (via menu)
- `Generate Sui Wallets` – Generate multiple wallets and store their keys
- `Run whitelist.js` – Execute your whitelist automation script
- `Check Proxy List` – View your proxies from `proxy.txt`
- `Check Wallet List` – View all wallet addresses from `address.txt`
- `Exit` – Close the tool

---

## 🔐 Notes

- If you're using your **own wallet**, just paste your address into `address.txt`.  
- If you generate a wallet via script, it will **automatically save the private key** in `private.txt`.
- ⚠️ **Back up your private keys after generation** — they will not be recoverable otherwise.

---

## 🌐 Proxy Setup

If you're using proxy-supported features (like `whitelist.js`), you can use proxies in this format:

```
http://username:pass@ip:port
```

Paste them into `proxy.txt`, one per line.

### 🛒 Get Proxies (Free Trials Available)
- [Oxylabs](https://oxylabs.io/)
- [Smartproxy](https://dashboard.smartproxy.com/)

---


## 📢 Join Our Telegram

👉 [Join the Telegram Channel for more scripts and updates](https://t.me/CYpTo_HaCkEr)

---

## ☠️ Disclaimer

This tool is for **educational purposes only**.  
Use at your own risk. I'm not responsible for any misuse.

