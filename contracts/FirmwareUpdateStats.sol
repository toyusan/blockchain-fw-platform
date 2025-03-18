// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FirmwareUpdateStats {
    struct UpdateRecord {
        uint256 successfulUpdates;
        uint256 failedUpdates;
        mapping(uint => uint) deviceVersionCount;
    }

    mapping(string => UpdateRecord) public updateRecords;

    event UpdateSuccess(string hardwareModel, uint versionIndex);
    event UpdateFailure(string hardwareModel, uint versionIndex);

    function recordUpdateSuccess(string memory hardwareModel, uint versionIndex) public {
        UpdateRecord storage record = updateRecords[hardwareModel];
        record.successfulUpdates++;
        record.deviceVersionCount[versionIndex]++;
        emit UpdateSuccess(hardwareModel, versionIndex);
    }

    function recordUpdateFailure(string memory hardwareModel, uint versionIndex) public {
        UpdateRecord storage record = updateRecords[hardwareModel];
        record.failedUpdates++;
        emit UpdateFailure(hardwareModel, versionIndex);
    }

    function getSuccessfulUpdates(string memory hardwareModel) public view returns (uint256) {
        return updateRecords[hardwareModel].successfulUpdates;
    }

    function getFailedUpdates(string memory hardwareModel) public view returns (uint256) {
        return updateRecords[hardwareModel].failedUpdates;
    }

    function getVersionCount(string memory hardwareModel, uint versionIndex) public view returns (uint) {
        return updateRecords[hardwareModel].deviceVersionCount[versionIndex];
    }
}