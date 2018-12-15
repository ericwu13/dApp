pragma solidity ^0.4.25;
import "./Transaction.sol";
contract Database is Transaction {
    
    //mapping
    mapping(uint256 => Transaction) txDatabase;
    uint txDatabaseSize = 0;

    //constant
    uint32 deliverFee;
    uint32 depositRatio;


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
        held(txDatabase[_txId]._driver, txDatabase[_txId]._value * depositRatio);
        txDatabase[_txId]._status = Status.DELIVERING;

    }
    function setSuccessTx(uint32 _txId) internal{
        txDatabase[_txId]._status = Status.SUCCESS;
        unheld(txDatabase[_txId]._buyer, txDatabase[_txId]._value);
        transport(txDatabase[_txId]._buyer, txDatabase[_txId]._seller, txDatabase[_txId]._value);
        unheld(txDatabase[_txId]._driver, txDatabase[_txId]._value * depositRatio);
        transport(txDatabase[_txId]._buyer, txDatabase[_txId]._driver, deliverFee);
    }

    


}
