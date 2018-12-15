pragma solidity ^0.4.25;

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
    mapping(address => Transaction);

    //constant
    uint32 deliverFee;
    uint32 depositRatio;

    //function for status
    function isPosting(Status _status) view returns (bool){
        return _status == 0;
    }
    function isBuying(Status _status) view returns (bool){
        return _status == 1;
    }
    function isDelievering(Status _status) view returns (bool){
        return _status == 2;
    }
    function isSuccess(Status _status) view returns (bool){
        return _status == 3;
    }
    function isFail(Status _status) view returns (bool){
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
