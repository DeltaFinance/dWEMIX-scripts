import './ethers.min.js';

document.getElementById('connectButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('connectButton').style.display = 'none';
            document.getElementById('depositArea').style.display = 'block';
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    } else {
        console.log('MetaMask is not installed!');
    }
});

document.getElementById('depositButton').addEventListener('click', async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = "0x334f696FE78623861733444d8476C36B0e9CdfC5";
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "deposit",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        }
    ];
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const amount = document.getElementById('depositAmount').value;

    try {
        console.log("Amount:", amount);
        const transactionResponse = await contract.deposit(signer.getAddress(), {
            value: ethers.utils.parseEther(amount),
            gasPrice: "100000000001",
            gasLimit: "30000000",
        });
        await transactionResponse.wait();
        console.log('Deposit successful!');
    } catch (error) {
        console.error('Error during deposit:', error);
    }
});
