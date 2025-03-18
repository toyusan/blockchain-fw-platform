// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./FirmwareRegistry.sol";

contract FirmwareUpdateChecker {
    FirmwareRegistry registry;

    constructor(address registryAddress) {
        registry = FirmwareRegistry(registryAddress);
    }

    function checkForUpdates(string memory hardwareModel) public view returns (FirmwareRegistry.FirmwareMetadata memory) {
        FirmwareRegistry.FirmwareMetadata memory firmware = registry.getLatestFirmware(hardwareModel);
        return firmware;
    }
}