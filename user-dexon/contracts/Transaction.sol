pragma solidity ^0.4.25;
import "./Status.sol";
contract CTransaction {
    
    //define Transation
    struct Transaction{
        uint256 _txId;
        address _seller;
        address _buyer;
        address _driver;
        Status _status;
        uint32 _value;
    }

}
