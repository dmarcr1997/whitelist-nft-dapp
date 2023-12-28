const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {

  const whitelistContract = await hre.ethers.deployContract("Whitelist", [10]);
  await whitelistContract.waitForDeployment();

  // print the address of the deployed contract
  console.log("Whitelist Contract Address:", whitelistContract.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: whitelistContract.target,
    constructorArguments: [10],
  });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });