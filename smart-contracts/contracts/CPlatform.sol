pragma solidity ^0.4.25;
import "./CDatabase.sol";
import "./CUserProfiles.sol";
import "./Restricted.sol";
contract CPlatform is CDatabase, Restricted{
       
    //event
    event eCreateUser(address _userAddress);
    event eEditUserName(address _userAddress, string _name);
    event eListProfile(string _name,
                   uint256 _balance,
                   uint32 _held_balance, // deposit
                   int32 _reputation);
    event ePost(address _userAddress, uint32 _value, uint256 _txId);
    event eBuy(address _userAddress, uint256 _txId);
    event ePend(address _userAddress, uint256 _txId);
    event eConfirmDeliver(uint256 _txId);
    event eConfirmTx(uint256 _txId);
    uint public guaranteedDeposit = 1000000000000000000;
    uint public deadline = 3 days;
    //function
    function sponsor(address account, uint256 value) external onlyOwner {
        _mint(account, value);
    }

    function createUser(string phoneNum) external payable {
        require(msg.value >= guaranteedDeposit, "Insufficient deposit");
        //require(bytes(_userProfiles[msg.sender]._name).length == 0, "The address has been created");

        _newUser(msg.sender, phoneNum);
    }
    function checkUser() external view returns(bool) {
        if(keccak256(_userProfiles[msg.sender]._name) != keccak256("")) {
            return true;
        } else {
            return false;
        }
    }

    function editUserName(string name) external {
        _editName(msg.sender, name);
    }

    function listProfile(address account) external view returns(string, uint256, uint32, uint32, uint32, string) {
        return _listUser(account);
    }

    function post(string name, uint32 value, string hashDescription) external {
        setPostTx(msg.sender, name, value, hashDescription);
    }

    function buy(uint256 txId, string pKey, string Hash) external onlyPositiveBalance(_userProfiles[msg.sender]._balance, txDatabase[txId]._value) hasNoBuyer(txId) {
        addBuyerInfo(txId, pKey, sHash);
        setBuyTx(txId, msg.sender);
        // emit buying(msg.sender, txId);
    }

    function pend(uint256 txId) external {
        setPendTx(txId, msg.sender);
        // emit pending(msg.sender, txId);
    }

    function confirmDeliver(uint256 txId) external onlyPositiveBalance(_userProfiles[msg.sender]._balance, txDatabase[txId]._value * depositRatio) onlySeller(txId){
        setDeliverTx(txId);
        // emit delivering(txId);
    }

    function confirmTx(uint256 txId) external onlyBuyer(txId) {
        setSuccessTx(txId);

        // emit success(txId);
    }
    function ratingTx(uint256 txId, uint32 seller_score, uint32 driver_score) external onlyBuyer(txId){
        setRatingTx(txId, seller_score, driver_score);
    }


}
