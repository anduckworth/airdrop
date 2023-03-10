const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  // Define a list of wallets to airdrop NFTs
  const airdropAddresses = [
    '0x82b43Ee2e45E663Ab5040A464B85C88A88A44a20'
  ];

  const tokenUri = "https://gateway.pinata.cloud/ipfs/QmWM4R6c2yqor3gybH3NXSvcwEMSsf9EuFVyV67Ka3Cix6"
 

  const factory = await hre.ethers.getContractFactory("NFTAirdrop");
  const [owner] = await hre.ethers.getSigners();
  const contract = await factory.deploy();

  await contract.deployed();
  console.log("Contract deployed to: ", contract.address);
  console.log("Contract deployed by (Owner): ", owner.address, "\n");

  let txn;
  txn = await contract.airdropNfts(airdropAddresses, tokenUri);
  await txn.wait();
  console.log("NFTs airdropped successfully!");

  console.log("\nCurrent NFT balances:")
  for (let i = 0; i < airdropAddresses.length; i++) {
    let bal = await contract.balanceOf(airdropAddresses[i]);
    console.log(`${i + 1}. ${airdropAddresses[i]}: ${bal}`);
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });