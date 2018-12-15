pragma solidity ^0.4.25;
import "./UserProfile.sol";
contract Database is UserProfile {
    
    //define Status
    /*
    struct Status{
        uint8 _status; //posting, buying, pending, delievering, success, fail
    }
    */
    enum Status {POSTING, BUYING, PENDING, DELIVERING, SUCCESS, FAIL}
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
    function isPosting(Status _status) view returns (bool){
        return _status == Status.POSTING;
    }
    function isBuying(Status _status) view returns (bool){
        return _status == Status.BUYING;
    }
    function isDelievering(Status _status) view returns (bool){
        return _status == Status.PENDING;
    }
    function isSuccess(Status _status) view returns (bool){
        return _status == Status.DELIVERING;
    }
    function isFail(Status _status) view returns (bool){
        return _status == Status.SUCCESS;
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
