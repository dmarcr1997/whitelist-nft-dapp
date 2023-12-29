const solMerger = require('sol-merger');
const fs = require('fs');
const path = require('path');

async function mergeContract(contractPath) {
  try {
    // Merge the contract
    const mergedCode = await solMerger.merge(contractPath);

    // Determine output path (e.g., in the 'build' directory)
    const outputDir = path.join(__dirname, 'build');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    const outputPath = path.join(outputDir, path.basename(contractPath));

    // Write the merged code to the file
    fs.writeFileSync(outputPath, mergedCode);
    console.log(`Merged contract written to: ${outputPath}`);
  } catch (err) {
    console.error(err);
  }
}

// Specify the path to your main contract file
const mainContractPath = './contracts/CryptoNauts.sol';
mergeContract(mainContractPath);
