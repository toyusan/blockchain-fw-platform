// scripts/interactFirmwareUpdateChecker.js
async function main() {
    const [deployer] = await ethers.getSigners();

    // The address of your deployed FirmwareUpdateChecker contract
    const contractAddress = '0xCEa7e4923FA1b63F4a6ce7319bBa194c0F93Cd62';

    // The ABI of the FirmwareUpdateChecker - usually found in the artifacts directory after compiling
    const FirmwareUpdateChecker = await ethers.getContractFactory("FirmwareUpdateChecker");
    const updateChecker = new ethers.Contract(contractAddress, FirmwareUpdateChecker.interface, deployer);

    // Checking for updates for a specific hardware model
    const hardwareModel = "Model-2.0"; // Example hardware model identifier
    const firmwareMetadata = await updateChecker.checkForUpdates(hardwareModel);
    console.log(`Latest Firmware for ${hardwareModel}: `, firmwareMetadata);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
