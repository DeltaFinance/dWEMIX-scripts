// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface IController {
    function deposit(address receiver) external payable returns (uint256);
}
