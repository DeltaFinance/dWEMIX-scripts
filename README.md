# Deposit via MetaMask Page

Connect and deposit ETH via MetaMask.

1. **Start**: Serve `index.html` (e.g., `python -m http.server`).
2. **Use**: Open `http://127.0.0.1:8000`, connect, and deposit.

*Needs MetaMask.*

---

# WEMIX Deposit Script

This repository contains a Node.js script for depositing WEMIX tokens and receiving DWEMIX tokens in return.
The script utilizes the Hardhat framework to interact with the Ethereum blockchain.

## Requirements

- Node.js
- npm

## Installation

First, clone this repository and install the necessary dependencies:

```bash
$ npm install
```

## Configuration

Before running the script, you must configure the following in a `.env` file located at the root of your project:

1. **Private Key**: Update the `PRIVATE_KEY` variable with your Ethereum wallet's private key. This key is necessary for signing transactions.

2. **Amount**: Update the `AMOUNT_IN` variable with the amount of WEMIX you want to deposit.

## Running the Script

To test the script in a safe environment, use the following command:

```bash
$ npx hardhat run scripts/deposit.js --network hardhat
```

For real execution on the WEMIX network, use:

```bash
$ npx hardhat run scripts/deposit.js --network wemix
```

## Disclaimer

Use this script at your own risk.
The creator of this script assumes no responsibility for any financial losses incurred through its use.
