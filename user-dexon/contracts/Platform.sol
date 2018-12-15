pragma solidity ^0.4.25;
import "./Ownable.sol";
import "./Database.sol";
import "./UserProfiles.sol";
import "./restricted.sol";
contract CPlatform is Ownable, CDatabase, Restricted{
    
    //event
    event newUser(address _userAddress, string _name);
    event listUser(string _name,
                   uint256 _balance,
                   uint32 _held_balance, // deposit
                   uint32 _reputation);
    event posting(address _userAddress, uint32 _value);
    event buying(address _userAddress, uint256 _txId);
    event pending(address _userAddress, uint256 _txId);
    event delivering(uint256 _txId);
    event success(uint256 _txId);
    uint public guaranteedDeposit = 1000000000000000000;
    //function
    function createUser(string name) external payable {
       require(msg.value >= guaranteedDeposit, "Insufficient deposit");
       require(bytes(_userProfiles[msg.sender]._name).length == 0, "The address has been created");

       _userProfiles[msg.sender] = User(name, 0 ,0, 0);
       emit newUser(msg.sender, name);
    }

    function listProfile() external {
        //require(_userProfiles[userAddress] != 0);
        emit listUser(_userProfiles[msg.sender]._name, 
                      _userProfiles[msg.sender]._balance, 
                      _userProfiles[msg.sender]._held_balance, 
                      _userProfiles[msg.sender]._reputation);
    }

    function post(uint32 value) external  {
        setPostTx(msg.sender, value);
        emit posting(msg.sender, value);
    }

    function buy(uint256 txId) external onlyPositiveBalance(_userProfiles[msg.sender]._balance, txDatabase[txId]._value) {
        setBuyTx(txId, msg.sender);
        emit buying(msg.sender, txId);
    }

    function pend(uint256 txId) external {
        setPendTx(txId, msg.sender);
        emit pending(msg.sender, txId);
    }

    function confirmDeliver(uint256 txId) external {
        setDeliverTx(txId);
        emit delivering(txId);
    }

    function confirmTx(uint256 txId ) external {
        setSuccessTx(txId);
        emit success(txId);
    }


}
