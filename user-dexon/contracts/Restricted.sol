pragma solidity ^0.4.25;
import "./Ownable.sol";
import "./CDatabase.sol";

contract Restricted is Ownable, CDatabase {

    event insufficientBalanceError();
    modifier onlyPositiveBalance(uint256 currentBalance, uint32 value) {
         require(currentBalance >= value, "Insufficient Balance!!!");
         emit insufficientBalanceError();
        _;

    }
    modifier onlySeller(uint256 txId){
        require(msg.sender == txDatabase[txId]._seller, "Not permitted!!!");
        _;
    }
    modifier onlyBuyer(uint256 txId){
        require(msg.sender == txDatabase[txId]._buyer, "Not permitted!!!");
        _;
    }
}
