pragma solidity ^0.4.25;
import "./UserProfile.sol";
import "./Status.sol";
import "./Transaction.sol";
contract CDatabase is CUserProfiles, CStatus, CTransaction {
    
    //mapping
    mapping(uint256 => Transaction) txDatabase;
    uint txDatabaseSize = 0;

    //constant
    uint32 deliverFee;
    uint32 depositRatio;


    //function for tx
    function setPostTx(address _seller, uint32 _value) internal returns(uint256) {
        txDatabase[txDatabaseSize] = Transaction(txDatabaseSize,    //txId
                                                 _seller,           // seller address
                                                 address(0),        // buyer address
                                                 address(0),        // driver address
                                                 Status.POSTING,    // status
                                                 _value);              // value
        txDatabaseSize++;
        return txDatabaseSize;
    }
        
    function setBuyTx(uint32 _txId, address _buyer) internal{
        txDatabase[_txId]._buyer = _buyer;
        _held(_buyer, txDatabase[_txId]._value);
        txDatabase[_txId]._status = Status.BUYING;
    }
        
    function setPendTx(uint32 _txId, address _driver) internal{
        txDatabase[_txId]._driver = _driver;
        txDatabase[_txId]._status = Status.PENDING;
    }
        
    function setDeliverTx(uint32 _txId) internal{
        _held(txDatabase[_txId]._driver, txDatabase[_txId]._value * depositRatio);
        txDatabase[_txId]._status = Status.DELIVERING;
    }
        
    function setSuccessTx(uint32 _txId) internal{
        _unheld(txDatabase[_txId]._buyer, txDatabase[_txId]._value);
        _transfer(txDatabase[_txId]._buyer, txDatabase[_txId]._seller, txDatabase[_txId]._value);
        _unheld(txDatabase[_txId]._driver, txDatabase[_txId]._value * depositRatio);
        _transfer(txDatabase[_txId]._buyer, txDatabase[_txId]._driver, deliverFee);
        txDatabase[_txId]._status = Status.SUCCESS;
    }


}
