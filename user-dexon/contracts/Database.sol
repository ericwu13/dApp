pragma solidity ^0.4.25;
import "./UserProfile.sol";
contract Database is UserProfile {
    
    //define Status
    struct Status{
        uint8 _status; //posting, buying, pending, delievering, success, fail
    }

    //define Transation
    struct Transaction{
        uint256 _txId;
        address _seller;
        address _buyer;
        address _driver;
        Status _status;
        uint32 _value;
    }

    //mapping
    mapping(address => Transaction) txDatabase;

    //constant
    uint32 deliverFee;
    uint32 depositRatio;

    //function for status
    function isPosting(uint8 _status) view returns (bool){
        return _status == 0;
    }
    function isBuying(uint8 _status) view returns (bool){
        return _status == 1;
    }
    function isDelievering(uint8 _status) view returns (bool){
        return _status == 2;
    }
    function isSuccess(uint8 _status) view returns (bool){
        return _status == 3;
    }
    function isFail(uint8 _status) view returns (bool){
        return _status == 4;
    }

    //function for tx
    function setPostTx(address _seller) internal{
    
    }
    function setBuyTx(uint32 _txId, address _buyer) internal{
    
    }
    function setPendTx(uint32 _txId, address _driver) internal{
    
    }
    function setDeliverTx(uint32 _txId) internal{
    
    }
    function setSuccessTx(uint32 _txId) internal{
    
    }
    


}
