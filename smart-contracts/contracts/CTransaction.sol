pragma solidity ^0.4.25;
import "./CStatus.sol";
contract CTransaction is CStatus{
    
    //define Transation
    struct Transaction{
        uint256 _txId;
        address _seller;
        address _buyer;
        address _driver;
        Status  _status;
        uint32  _value;
        uint    _timestamp;
        string  _name;
        string _hashDescription;
        string _hashBuyerInfo;
        string _buyerPKey;
    }

}
