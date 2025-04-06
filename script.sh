#!/bin/bash

GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════════╗"
echo "║                   CrYpTo HaCkEr                  ║"
echo "║                    by @hack_erx                  ║"
echo "╚══════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check Node.js
if ! command -v node &> /dev/null
then
    echo -e "${GREEN}→ Node.js not found. Installing...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo -e "${GREEN}✔ Node.js is already installed.${NC}"
fi

# Install packages
echo -e "${GREEN}→ Installing required npm packages...${NC}"
npm install node-fetch@2 chalk @faker-js/faker https-proxy-agent @mysten/sui.js

# Persistent menu loop
while true; do
    echo -e "${CYAN}\nChoose an action:${NC}"
    select option in "Generate Sui Wallets" "Run whitelist.js" "Check Proxy List" "Check Wallet List" "Exit"
    do
        case $option in
            "Generate Sui Wallets")
                echo -e "${GREEN}→ Running wallet generator...${NC}"
                node scripts/generateWallets.js
                break
                ;;
            "Run whitelist.js")
                echo -e "${GREEN}→ Running whitelist.js...${NC}"
                node scripts/whitelist.js
                break
                ;;
            "Check Proxy List")
                echo -e "${GREEN}→ Showing proxies:${NC}"
                cat payloads/proxy.txt
                break
                ;;
            "Check Wallet List")
                echo -e "${GREEN}→ Showing wallets:${NC}"
                cat payloads/address.txt
                break
                ;;
            "Exit")
                echo -e "${GREEN}→ Goodbye!${NC}"
                exit 0
                ;;
            *)
                echo -e "${CYAN}Invalid option. Try again.${NC}"
                ;;
        esac
    done
done
