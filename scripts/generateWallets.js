const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk').default
const { Ed25519Keypair } = require('@mysten/sui.js/keypairs/ed25519');

// File paths
const addressFile = 'payloads/address.txt';
const privateKeyFile = 'payloads/private.txt';

// Setup readline for input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Check if files exist and have content
const addressExists = fs.existsSync(addressFile) && fs.readFileSync(addressFile, 'utf8').trim() !== '';
const privateKeyExists = fs.existsSync(privateKeyFile) && fs.readFileSync(privateKeyFile, 'utf8').trim() !== '';

function askYesNo(question) {
    return new Promise(resolve => {
        rl.question(chalk.yellow(question), (answer) => {
            resolve(answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === 'yes');
        });
    });
}

async function main() {
    console.log(chalk.green.bold('\n🔐 Sui Wallet Generator 🔐\n'));

    // If files already contain data
    if (addressExists || privateKeyExists) {
        console.log(chalk.red.bold('⚠️  Warning: Existing addresses or private keys found!'));
        console.log(chalk.red('If you continue, they will be overwritten and lost forever.\n'));

        const confirm = await askYesNo('❓ Do you want to continue anyway? (y/n): ');
        if (!confirm) {
            console.log(chalk.blue('\n🛑 Operation cancelled. Please back up your keys before running again.\n'));
            rl.close();
            return;
        }
    }

    // Ask user for wallet count
    rl.question(chalk.green('👉 How many wallets do you want to generate? '), (answer) => {
        const TOTAL_WALLETS = parseInt(answer);
        if (isNaN(TOTAL_WALLETS) || TOTAL_WALLETS <= 0) {
            console.log(chalk.red('\n❌ Invalid number. Please enter a positive integer.\n'));
            rl.close();
            return;
        }

        // Clear or create files
        fs.writeFileSync(addressFile, '');
        fs.writeFileSync(privateKeyFile, '');

        for (let i = 0; i < TOTAL_WALLETS; i++) {
            const keypair = new Ed25519Keypair();
            const address = keypair.getPublicKey().toSuiAddress();
            const fullSecretKey = keypair.getSecretKey();
            fs.appendFileSync(addressFile, `${address}\n`);
            fs.appendFileSync(privateKeyFile, `${fullSecretKey}\n`);
        }

        console.log(chalk.blueBright(`\n✅ Successfully generated ${TOTAL_WALLETS} wallets!`));
        console.log(chalk.yellow(`📂 Addresses saved in ${addressFile}`));
        console.log(chalk.yellow(`📂 Private keys saved in ${privateKeyFile}\n`));

        rl.close();
    });
}

main();
