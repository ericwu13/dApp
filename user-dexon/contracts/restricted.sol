pragma solidity ^0.4.25;

contract Restricted{

    event insufficientBalanceError();
    modifier onlyPositiveBalance(uint256 currentBalance, uint32 value) {
         require(currentBalance >= value);
         emit insufficientBalanceError();
        _;

    }
}
