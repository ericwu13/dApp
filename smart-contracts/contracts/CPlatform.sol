pragma solidity ^0.4.25;
import "./CDatabase.sol";
import "./CUserProfiles.sol";
import "./Restricted.sol";

contract CPlatform is CDatabase, Restricted{
       
    //event
    event eCreateUser(address _userAddress);
    event eEditUserName(string _name);
    event eListProfile(string _name,
                   uint256 _balance,
                   uint32 _held_balance, // deposit
                   int32 _reputation);
    event ePost(uint txId);
    event eBuy(uint txId);
    event ePend(uint txId);
    event eConfirmDeliver(uint txId);
    event eConfirmTx(uint256 txId);
    uint public guaranteedDeposit = 1000000000000000000;
    uint public deadline = 3 days;
    //function
    function sponsor(address account, uint256 value) external onlyOwner {
        _mint(account, value);
    }

    function createUser(string phoneNum, string name) external payable {
        require(msg.value >= guaranteedDeposit, "Insufficient deposit");
        //require(bytes(_userProfiles[msg.sender]._name).length == 0, "The address has been created");
        _newUser(msg.sender, phoneNum, name);
    }
    
    // function checkUser() external view returns(bool) {
    //     if(keccak256(_userProfiles[msg.sender]._name) == keccak256("")) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
   

    function editUserName(string name) external {
        _editName(msg.sender, name);
        emit eEditUserName(name);
    }

    function listProfile(address account) external view returns(string, uint256, uint256, uint32, uint32, string) {
        return _listUser(account);
    }

    function post(string name, uint32 value, string hashDescription) external {
        setPostTx(msg.sender, name, value, hashDescription);
        emit ePost(txDatabaseSize-1);
    }

    function buy(uint256 txId, string pKey, string Hash) external onlyPositiveBalance(_userProfiles[msg.sender]._balance, txDatabase[txId]._value) hasNoBuyer(txId) {
        addBuyerInfo(txId, pKey, Hash);
        setBuyTx(txId, msg.sender);
        emit eBuy(txId);
    }

    function pend(uint256 txId) external onlyPositiveBalance(_userProfiles[msg.sender]._balance, txDatabase[txId]._value * depositRatio) {
        setPendTx(txId, msg.sender);
        emit ePend(txId);
    }

    function confirmDeliver(uint256 txId) external onlySeller(txId){
        setDeliverTx(txId);
        emit eConfirmDeliver(txId);
    }

    function confirmTx(uint256 txId) external onlyBuyer(txId) {
        setSuccessTx(txId);

        emit eConfirmTx(txId);
    }
    function ratingTx(uint256 txId, uint32 seller_score, uint32 driver_score) external onlyBuyer(txId){
        setRatingTx(txId, seller_score, driver_score);
    }
    
    
    function getHashDescription(uint256 _txId) external view returns (string) {
        return txDatabase[_txId]._hashDescription;
    }
    function getSellerInfo(uint256 _txId) external view returns (string) {
        // require(msg.sender == txDatabase[_txId]._seller || msg.sender == txDatabase[_txId]._driver);
        return _userProfiles[txDatabase[_txId]._seller]._phoneNum;
    }
    function getBuyerInfo(uint256 _txId) external view returns (string, string) {
        // require(msg.sender == txDatabase[_txId]._buyer || msg.sender == txDatabase[_txId]._driver);
        return (txDatabase[_txId]._hashBuyerInfo, txDatabase[_txId]._buyerPKey);
    }
    function getTxAllName(address seller, address buyer, address driver ) external view returns(string, string, string) {
        return (_userProfiles[seller]._name, _userProfiles[buyer]._name, _userProfiles[driver]._name);
    }


}
