const fetch = require('node-fetch');
const fs = require('fs');
const { HttpsProxyAgent } = require('https-proxy-agent');
const chalk = require('chalk').default;
const { faker } = require('@faker-js/faker');
const readline = require('readline');

const log = {
  ok: chalk.green.bold,
  fail: chalk.red.bold,
  wait: chalk.yellow,
  info: chalk.cyan,
  section: chalk.magenta,
};

function loadFileLines(path) {
  try {
    const content = fs.readFileSync(path, 'utf-8');
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) throw new Error(`${path} is empty`);
    return lines;
  } catch (err) {
    console.log(log.fail(`Error loading ${path}: ${err.message}`));
    process.exit(1);
  }
}

const walletList = loadFileLines('./payloads/address.txt');
const emailList = loadFileLines('./payloads/email.txt');
const proxyList = loadFileLines('./payloads/proxy.txt');

console.log(log.section('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
console.log(log.info(`Wallets Loaded: ${walletList.length}`));
console.log(log.info(`Emails Loaded: ${emailList.length}`));
console.log(log.info(`Proxies Loaded: ${proxyList.length}`));
console.log(log.section('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

const fakeTwitterHandle = () =>
  faker.internet.username().replace(/[^a-z0-9_]/gi, '').toLowerCase().substring(0, 15);

async function sendRequest(wallet, email, proxy, index) {
  const apiUrl = "https://hokko-locked-production.up.railway.app/whitelist";

  const payload = {
    email,
    walletAddress: wallet,
    twitter: fakeTwitterHandle()
  };

  const agent = new HttpsProxyAgent(proxy);
  const headers = {
    "content-type": "application/json",
    "user-agent": faker.internet.userAgent()
  };

  for (let retry = 1; retry <= 3; retry++) {
    try {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(log.wait(`⏳ Submitting Wallet ${index + 1}/${walletList.length} (Try ${retry})`));
      const res = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        agent
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      console.log(log.ok(`✅ Success ${index + 1}: ${wallet.slice(0, 6)}...${wallet.slice(-4)} | ${json.message || 'Whitelisted'}`));
      return true;
    } catch (err) {
      if (retry === 3) {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(log.fail(`❌ Failed ${index + 1}: ${wallet} | ${err.message}`));
      } else {
        await new Promise(res => setTimeout(res, 2000));
      }
    }
  }
}

(async function execute() {
  console.log(log.ok('Beginning Wallet Whitelisting...\n'));

  for (let i = 0; i < Math.min(walletList.length, emailList.length); i++) {
    const proxy = proxyList[i % proxyList.length];
    await sendRequest(walletList[i], emailList[i], proxy, i);

    if (i < walletList.length - 1) {
      const wait = Math.floor(Math.random() * 4000) + 2000;
      console.log(log.wait(`⏳ Pausing for ${(wait / 1000).toFixed(1)} seconds...`));
      await new Promise(r => setTimeout(r, wait));
    }
  }

  console.log(log.section('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log(log.ok('🎉 Process Completed!'));
  console.log(log.section('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
})();
