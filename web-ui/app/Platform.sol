pragma solidity ^0.4.25;

contract Election {

    address owner;
    uint public totalVote = 0;
    bool public isVoting = false;
    uint public round = 0;
    uint public guaranteedDeposit = 1000000000000000000; // create user need money
    uint public refundRatio = 5; // more than 1/5 to get refund

    struct User {
        string _name;
        uint32 _balance;
        uint32 _heldBalance;
        uint32 _reputation;
    }
    mapping(address => User) public userProfiles;

    event create(string name, address user);

    modifier isNotRegistered() {
        require(bytes(userProfiles[msg.sender]._name).length != 0, "One address can only register one time");
        _;
    }
    function createUser(string name) public isNotRegistered payable {
        /* Extra bonus implementation */
        require(msg.value >= guaranteedDeposit, "Insufficient deposit");
        require(bytes(name).length == 0, "Empty name is not allowed");

        User memory newUser;
        newUser._name = name;
        userProfiles[msg.sender] = newUser;
        //candiatesList.push(msg.sender);
        emit create(name, msg.sender);
    }
    function listProfile(address user) public {

    }

    function getCandidatesList() public view returns (address[]) {
        return candiatesList;
    }

    function post() public {

    }
}
