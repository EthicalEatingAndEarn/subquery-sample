import { task } from "hardhat/config";

task("safe-mint", "Safe Minting")
  .addParam("params", "New NFT params")
  .setAction(async (taskArgs, {}) => {
    // TODO
    console.log(taskArgs);
  });