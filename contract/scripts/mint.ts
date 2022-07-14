import { ethers } from "hardhat";
import { CryplantNFT } from "../typechain-types";

import dotenv from 'dotenv';
dotenv.config();


/**
 * @dev This is an example that shows how to execute a flash loan with your deployed contract.
 * Usage
 * 1. Input your deployed contract address in the script
 * 2. Edit each parameter to your needs (For more information, see "https://github.com/yuichiroaoki/poly-flash/wiki/Supporting-Dex-Protocols")
 * 3. Run the script with `npx hardhat run scripts/flashloan.ts`
 */
async function main() {
  const [owner] = await ethers.getSigners();
  const contract = await ethers.getContractAt(
    "CryplantNFT",
    "0xDA4A8f127131DB745Cc4be4b65dAFb7B47a9D8F5",
    owner
  ) as CryplantNFT;

  const args = [
    {
      owner: "0x8a8D4f4fe2cB36A90b79E08453Df8d048fdeF4c1",
      name: "RAREPEPESHOW",
      uri: "https://gateway.pinata.cloud/ipfs/QmUt9aSL5xMozR4nq5a4MjGXv2xEb2UTrveiAd95qZYtDo",
      level: 1,
      toNextlevel: 2
    },
    {
      owner: "0x2b80a2E22cFfc38a789260aDd542AFFF8f5B7E67",
      name: "PENPEN",
      uri: "https://gateway.pinata.cloud/ipfs/QmcD6VjpY3nnt7dqyHLTci5315oYQQGJE193VNreYWSv5N",
      level: 3,
      toNextlevel: 4
    },
    {
      owner: "0xdB32851e894c3b1d5e2eB6bEf4094D1f0940DdaC",
      name: "NASPEPE",
      uri: "https://gateway.pinata.cloud/ipfs/QmUfC6v3uBH5LxKqGZd6yjTuzZ6jHoZbFaFvHmu6ntsXxu",
      level: 2,
      toNextlevel: 3
    }
  ]

  const tx = await contract.safeMint(args);
  console.log(tx);
  console.log(await tx.wait());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
