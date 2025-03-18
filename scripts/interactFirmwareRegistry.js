// scripts/interactFirmwareRegistry.js
async function main() {
    const [deployer] = await ethers.getSigners();

    // The address of your deployed FirmwareRegistry contract
    const contractAddress = '0xCc761187344D4f806b1c91072cC343540F8De95E';

    // The ABI of the FirmwareRegistry - usually found in the artifacts directory after compiling
    const FirmwareRegistry = await ethers.getContractFactory("FirmwareRegistry");
    const firmwareRegistry = new ethers.Contract(contractAddress, FirmwareRegistry.interface, deployer);

    // Adding a firmware entry
    console.log("Addding Firmware metada");
    const addFirmwareTx = await firmwareRegistry.addFirmware(
        "Model-2.0",
        "v1.1",
        "Airton Toyofuku-Toyotech",
        "2351f58257d33a20bde281bf60f3cf86e20eb6d3fa8cb46e1539aab59a588c3b",
        "20240724-22h16m",
        "OTA Version for timing test - T0",
        "QmeYizCjAByRsLYvqGXwP3Vu1mpUyipGD8DMV6DZedfTtP"
    );
    await addFirmwareTx.wait();
    console.log("Firmware added.");

    // Fetching the latest firmware details
    const latestFirmware = await firmwareRegistry.getLatestFirmware("Model-2.0");
    console.log(`Latest Firmware: `, latestFirmware);

    // Fetching a specific version of firmware
    console.log("Searching Firmware for Model-2.0 index 0");
    const firmwareByVersion = await firmwareRegistry.getFirmwareByVersion("Model-2.0", 0);
    console.log(`Firmware by Version: `, firmwareByVersion);

    console.log("Searching Firmware for Model-2.0 index 1");
    firmwareByVersion = await firmwareRegistry.getFirmwareByVersion("Model-2.0", 1);
    console.log(`Firmware by Version: `, firmwareByVersion);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
