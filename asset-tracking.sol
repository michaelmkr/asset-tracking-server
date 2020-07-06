pragma solidity >=0.6.10;
// "SPDX-License-Identifier: UNLICENSED"
contract assetTracking {
   
    string storedData;
    string lastWrittenLocation;
   
    function writeLocationDataString(string memory _location) public {
        if (bytes(storedData).length > 0) storedData = append(storedData, ';');
        storedData = append(storedData, _location);
        lastWrittenLocation = _location;
    }

    function append(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }
   
    function getAllLocations() public view returns (string memory) {
        return storedData;
    }
   
    function getLastLocation() public view returns (string memory) {
        return lastWrittenLocation;
    }
}