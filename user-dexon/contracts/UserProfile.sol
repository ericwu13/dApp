pragma solidity ^0.4.25;

contract UserProfile {

    //define User
    struct User{
        string _name;
        uint32 _balance;
        uint32 _held_balance; // deposit
        uint32 _reputation;
        address _address;
    }
    //mapping
    mapping(address => User) UserProfiles;

    //functions of User
    function held(address _target, uint32 _value) internal{
        UserProfiles[_target]._balance -= _value;               
        UserProfiles[_target]._held_balance += _value;               
    } 
    function unheld(address _target, uint32 _value) internal{
        UserProfiles[_target]._held_balance -= _value;
        UserProfiles[_target]._balance += _value;
    }
    function transport(address _from, address _to, uint32 _value) internal{
        UserProfile[_from]._balance -= _value;
        UserProfile[_to]._balance += _value;
    }
    function addReputation(address _address) internal{
        UserProfiles[_address]._reputation += 1;
    }


}
