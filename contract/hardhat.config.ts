import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "hardhat-storage-layout";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";
import networks from "./networks";
import dotenv from "dotenv";
dotenv.config();

import "./tasks/safe-mint";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "shibuya",
        chainId: 81,
        urls: {
          // apiURL: "https://api-rinkeby.etherscan.io/api",
          // browserURL: "https://rinkeby.etherscan.io"
          apiURL: "https://blockscout.com/shibuya/api",
          browserURL: "https://shibuya.subscan.io/"
        }
      }

    ]
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 60,
  },
  networks,
  namedAccounts: {
    deployer: 0
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
};

export default config;