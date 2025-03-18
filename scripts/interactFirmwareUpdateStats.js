// scripts/interactFirmwareUpdateStats.js
async function main() {
    const [deployer] = await ethers.getSigners();

    // The address of your deployed FirmwareUpdateStats contract
    const contractAddress = '0x6E1cbdA9dbE6833095344d5529fA7eBeCdfa8504';

    // The ABI of the FirmwareUpdateStats - usually found in the artifacts directory after compiling
    const FirmwareUpdateStats = await ethers.getContractFactory("FirmwareUpdateStats");
    const statsContract = new ethers.Contract(contractAddress, FirmwareUpdateStats.interface, deployer);

    // Example hardware model and version index
    const hardwareModel = "Model-2.0";
    const versionIndex = 1;

    // Record a successful update
    for(let contador = 0; contador <= 20; contador++){
    let txResponse = await statsContract.recordUpdateSuccess(hardwareModel, versionIndex);
    await txResponse.wait();
    console.log("Recorded a successful update.");
    }

    // Record a failed update
    for(let contador = 0; contador <= 5; contador++){
    txResponse = await statsContract.recordUpdateFailure(hardwareModel, versionIndex);
    await txResponse.wait();
    console.log("Recorded a failed update.");
    }

    // Get successful updates count
    const successfulUpdates = await statsContract.getSuccessfulUpdates(hardwareModel);
    console.log(`Total successful updates for ${hardwareModel}: ${successfulUpdates}`);

    // Get failed updates count
    const failedUpdates = await statsContract.getFailedUpdates(hardwareModel);
    console.log(`Total failed updates for ${hardwareModel}: ${failedUpdates}`);

    // Get version count for a specific version index
    const versionCount = await statsContract.getVersionCount(hardwareModel, versionIndex);
    console.log(`Total updates for ${hardwareModel} version ${versionIndex}: ${versionCount}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
