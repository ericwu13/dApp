pragma solidity ^0.4.25;
import "./Ownable.sol";
import "./Database.sol";
import "./UserProfile.sol";
contract CPlatform is Ownable, CDatabase{
    
    //event
    event newUser(address _userAddress, string _name);
    event listUser(User _user);
    //function
    function createUser(address userAddress, string name) external{
       _userProfiles[userAddress] = User(name, 0 ,0, 0, userAddress);
       emit newUser(userAddress, _name);
    }

    function listProfile(address userAddress) external returns (User) {
        require(_userProfiles[userAddress] != 0);
        emit listUser(_userProfiles[userAddress]);
        return _userProfiles[userAddress];
    }

    function post(address userAddress, uint32 value) external {}

    function buy() {}

    function deliver() {}

    function confirmDeliver() {}

    function confirmTx() {}


}
