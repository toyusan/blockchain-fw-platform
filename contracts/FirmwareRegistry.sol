// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FirmwareRegistry {
    struct FirmwareMetadata {
        string version;
        string author;
        string hardwareModel;
        string integrityHash;
        string timestamp;
        string description;
        string cid; // Content Identifier for IPFS
    }

    struct FirmwareVersions {
        FirmwareMetadata[] versions;
        uint latestIndex;
    }

    mapping(string => FirmwareVersions) public firmwareRegistry;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action.");
        _;
    }

    function addFirmware(
        string memory hardwareModel,
        string memory version,
        string memory author,
        string memory integrityHash,
        string memory timestamp,
        string memory description,
        string memory cid
    ) public onlyAdmin {
        FirmwareMetadata memory newFirmware = FirmwareMetadata({
            version: version,
            author: author,
            hardwareModel: hardwareModel,
            integrityHash: integrityHash,
            timestamp: timestamp,
            description: description,
            cid: cid
        });

        FirmwareVersions storage versions = firmwareRegistry[hardwareModel];
        versions.versions.push(newFirmware);
        versions.latestIndex = versions.versions.length - 1;
    }

    function getLatestFirmware(string memory hardwareModel) public view returns (FirmwareMetadata memory) {
        require(firmwareRegistry[hardwareModel].versions.length > 0, "No firmware versions available.");
        return firmwareRegistry[hardwareModel].versions[firmwareRegistry[hardwareModel].latestIndex];
    }

    function getFirmwareByVersion(string memory hardwareModel, uint versionIndex) public view returns (FirmwareMetadata memory) {
        require(versionIndex < firmwareRegistry[hardwareModel].versions.length, "Version index out of bounds");
        return firmwareRegistry[hardwareModel].versions[versionIndex];
    }
}
