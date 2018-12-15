pragma solidity ^0.4.25;
import "./UserProfile.sol";
import "./Status.sol";
contract Transaction is UserProfile, Status{
    
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
