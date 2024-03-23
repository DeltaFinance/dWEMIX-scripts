const { ethers } = require("hardhat");
require('dotenv').config();

// Define a private key
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Amount of WEMIX to be deposited (>= 2000 WEMIX)
const amountIn = ethers.parseEther(process.env.AMOUNT_IN);

// Define an asynchronous function to deposit WEMIX
async function deposit() {
    // Create a new wallet instance using the private key
    const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider);
    console.log("Wallet address:", wallet.address);

    // Get the contract instance of 'IController' and 'IDWemix'
    const controller = await ethers.getContractAt("IController", "0x334f696FE78623861733444d8476C36B0e9CdfC5");
    const dwemix = await ethers.getContractAt("IDWemix", "0x531e6Abe1ad0c8313ad7c8f7ad96b8e70c56164E");

    // Fetch the current balance of DWEMIX tokens before the deposit
    const beforeDwemix = await dwemix.balanceOf(wallet.address);

    // Create a transaction to deposit WEMIX to the contract
    const transaction = await controller.connect(wallet).deposit(wallet.address, {
        value: amountIn,
        gasPrice: "100000000001",
        gasLimit: "30000000",
    });

    // Wait for the transaction to be mined
    await transaction.wait();
    console.log("Deposit transaction successful:", transaction.hash);

    // Fetch the current balance of DWEMIX tokens after the deposit
    const afterDwemix = await dwemix.balanceOf(wallet.address);

    // Calculate the amount of DWEMIX tokens received from the deposit
    const dwemixReceived = afterDwemix - beforeDwemix;
    console.log(`${ethers.formatEther(amountIn)} WEMIX deposited. DWEMIX received: ${ethers.formatEther(dwemixReceived)}`);
}

// Execute the deposit function and handle success or error
deposit()
    .then(() => {
        console.log("Deposit successful");
        process.exit(0); // Exit the process on success
    })
    .catch((error) => {
        console.error("Deposit failed:", error);
        process.exit(1); // Exit the process with an error code on failure
    });
