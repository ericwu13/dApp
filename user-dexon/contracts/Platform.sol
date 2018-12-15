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
    event delivering(uint256 _txId);
    //function
    function createUser(address userAddress, string name) external onlyOwner{
       _userProfiles[userAddress] = User(name, 0 ,0, 0);
       emit newUser(userAddress, name);
    }

    function listProfile(address userAddress) external {
        //require(_userProfiles[userAddress] != 0);
        emit listUser(_userProfiles[userAddress]._name, 
                      _userProfiles[userAddress]._balance, 
                      _userProfiles[userAddress]._held_balance, 
                      _userProfiles[userAddress]._reputation);
    }

    function post(address userAddress, uint32 value) external  {
        setPostTx(userAddress, value);
        emit posting(userAddress, value);
    }

    function buy(address userAddress, uint256 txId) external onlyPositiveBalance(_userProfiles[userAddress]._balance, txDatabase[txId]._value) {
        setBuyTx(txId, userAddress);
        emit buying(userAddress, txId);
    }

    function deliver() {}

    function confirmDeliver(uint256 txId) external {
        setDeliverTx(txId);
        emit delivering(txId);
    }

    function confirmTx() {}


}
