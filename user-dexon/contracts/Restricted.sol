pragma solidity ^0.4.25;
import "./Ownable.sol";

contract Restricted is Ownable {

    event insufficientBalanceError();
    modifier onlyPositiveBalance(uint256 currentBalance, uint32 value) {
         require(currentBalance >= value, "Insufficient Balance!!!");
         emit insufficientBalanceError();
        _;

    }
}
