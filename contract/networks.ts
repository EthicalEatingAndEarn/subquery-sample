import { NetworksUserConfig } from "hardhat/types";
import dotenv from 'dotenv';

dotenv.config();

const networks: NetworksUserConfig = {};

if (process.env.PRIVATE_KEY) {
  networks.shibuya = {
    chainId: 81,
    url: "https://shibuya.public.blastapi.io",
    accounts: [process.env.PRIVATE_KEY]
  };
} else {
  networks.hardhat = {}
}

export default networks;