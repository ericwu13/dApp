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
    //function
    function createUser() external payable {
        require(msg.value >= guaranteedDeposit, "Insufficient deposit");
        // require(bytes(_userProfiles[msg.sender]._name).length == 0, "The address has been created");

        _userProfiles[msg.sender] = User("[empty name]", 0 ,0, 200);
        // emit eCreateUser(msg.sender);
    }

    function editUserName(string name) external {
        _editName(msg.sender, name);
    }

    function listProfile() external view returns(string, uint256, uint32, int32) {
        return( _userProfiles[msg.sender]._name,
                _userProfiles[msg.sender]._balance,
                _userProfiles[msg.sender]._held_balance,
                _userProfiles[msg.sender]._reputation);
    }

    function post(uint32 value) external returns(uint256) {
        uint id = setPostTx(msg.sender, value);
        return id;
    }

    function buy(uint256 txId) external onlyPositiveBalance(_userProfiles[msg.sender]._balance, txDatabase[txId]._value) {
        setBuyTx(txId, msg.sender);
        // emit buying(msg.sender, txId);
    }

    function pend(uint256 txId) external {
        setPendTx(txId, msg.sender);
        // emit pending(msg.sender, txId);
    }

    function confirmDeliver(uint256 txId) external onlyPositiveBalance(_userProfiles[msg.sender]._balance, txDatabase[txId]._value * depositRatio){
        setDeliverTx(txId);
        // emit delivering(txId);
    }

    function confirmTx(uint256 txId ) external {
        setSuccessTx(txId);
        // emit success(txId);
    }


}
