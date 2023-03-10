require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider("arbitrum-goerli", API_KEY)

// Get Contract ABI
const contract = require("../artifacts/contracts/NFTAirdrop.sol/NFTAirdrop.json");
//console.log(JSON.stringify(contract.abi));

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x13DE1dF57eb4dC6080Dda2B6efba674BCd24994e'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmWM4R6c2yqor3gybH3NXSvcwEMSsf9EuFVyV67Ka3Cix6"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.airdropNfts(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://testnet.arbiscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });