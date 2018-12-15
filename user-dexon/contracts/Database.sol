pragma solidity ^0.4.25;
pragma experimental ABIEncoderV2;
import "./UserProfile.sol";
contract Database is UserProfile {
    
    //define Status
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
    mapping(uint256 => Transaction) txDatabase;
    uint txDatabaseSize = 0;


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
    function setPostTx(address _seller) internal returns(uint256) {
        txDatabase[txDatabaseSize] = Transaction(txDatabaseSize,    //txId
                                                 _seller,           // seller address
                                                 address(0),        // buyer address
                                                 address(0),        // driver address
                                                 Status.POSTING,    // status
                                                 100);              // value
        txDatabaseSize++;
        return txDatabaseSize;
    }
        
    function setBuyTx(uint32 _txId, address _buyer) internal{
        txDatabase[_txId]._buyer = _buyer;
        txDatabase[_txId]._status = Status.BUYING;
        held(_buyer, txDatabase[_txId]._value);

    }
    function setPendTx(uint32 _txId, address _driver) internal{
        txDatabase[_txId]._driver = _driver;
        txDatabase[_txId]._status = Status.PENDING;
    }
    function setDeliverTx(uint32 _txId) internal{
        held(txDatabase[_txId]._driver, txDatabase[_txId].value * depositRatio);
        txDatabase[_txId]._status = Status.DELIVERING;

    }
    function setSuccessTx(uint32 _txId) internal{
        txDatabase[_txId]._status = Status.SUCCESS;
        unheld(txDatabase[_txId]._buyer, txDatabase[_txId]._value);
        transport(txDatabase[_txId]._buyer, txDatabase[_txId]._sender, txDatabase[_txId]._value);
        unheld(txDatabase[_txId]._driver, txDatabase[_txId]._value * depositRatio);
    }

    


}
