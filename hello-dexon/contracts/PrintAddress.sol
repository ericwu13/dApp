pragma solidity ^0.4.23;

contract PrintAddress {
   event Address(address _owner);
   function getAddress() public view {
      emit Address(msg.sender);
   }
}
