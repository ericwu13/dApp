pragma solidity ^0.4.25;
import "./Ownable.sol";
import "./Database.sol";
import "./UserProfile.sol";
contract CPlatform is Ownable, CDatabase{
    
    //event
    event newUser(address _userAddress, string _name);
    event listUser(string _name,
                   uint256 _balance,
                   uint32 _held_balance, // deposit
                   uint32 _reputation);
    event posting(address _userAddress, uint32 _value);
    event buying(address _userAddress, uint256 _txId);
    //function
    function createUser(address userAddress, string name) external{
       _userProfiles[userAddress] = User(name, 0 ,0, 0);
       emit newUser(userAddress, name);
    }

    function listProfile(address userAddress) external {
        //require(_userProfiles[userAddress] != 0);
        User u = _userProfiles[userAddress];
        emit listUser(u._name, u._balance, u._held_balance, u._reputation);
    }

    function post(address userAddress, uint32 value) external {
        setPostTx(userAddress, value);
        emit posting(userAddress, value);
    }

    function buy(address userAddress, uint256 txId) external {
        setBuyTx(txId, userAddress);
        emit buying(userAddress, txId);
    }

    function deliver() {}

    function confirmDeliver() {}

    function confirmTx() {}


}
