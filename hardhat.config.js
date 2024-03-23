require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{
      version: "0.8.24",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://api.wemix.com",
        chainId: 1111,
      },
      allowUnlimitedContractSize: true,
    },
    wemix: {
      url: "https://api.wemix.com",
      chainId: 1111,
    },
  },
};