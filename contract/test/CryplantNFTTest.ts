import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { CryplantNFT } from "../typechain-types";

describe("CryplantNFT", async () => {
  let signer: SignerWithAddress;
  let owner1: SignerWithAddress;
  let owner2: SignerWithAddress;
  let cryplant: CryplantNFT;

  beforeEach(async () => {
    signer = (await ethers.getSigners())[0];
    owner1 = (await ethers.getSigners())[1];
    owner2 = (await ethers.getSigners())[2];
    const { CryplantNFT } = await deployments.fixture([
      "CryplantNFT"
    ]);

    cryplant = (await ethers.getContractAt(
      "CryplantNFT",
      CryplantNFT.address,
      signer
    )) as CryplantNFT;
  });

  it("SafeMint", async () => {
    const args = [
      {
        owner: owner1.address,
        name: "A",
        uri: "ipfs://",
        level: 1,
        toNextlevel: 2
      },
      {
        owner: owner2.address,
        name: "B",
        uri: "ipfs://",
        level: 10,
        toNextlevel: 11
      }
    ];
    await cryplant.connect(signer).safeMint(args);
    const resp = await cryplant.getInfo(1);
    expect(resp.owner).to.be.equal(owner1.address);
    expect(resp.name).to.be.equal("A");
    expect(resp.level.toString()).to.be.equal("1");
    expect(resp.toNextlevel.toString()).to.be.equal("2");
    expect(await cryplant.tokenURI(1)).to.be.equal("ipfs://");
  });
})