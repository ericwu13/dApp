pragma solidity ^0.4.25;
import "./Ownable.sol";

contract CStatus is Ownable {
    
    //define Status
    enum Status {POSTING, BUYING, PENDING, DELIVERING, SUCCESS, FAIL, AFTERRATING}

    //function for status
    function isPosting(Status status) external view onlyOwner returns (bool){
        return status == Status.POSTING;
    }
    function isBuying(Status status) external view onlyOwner returns (bool){
        return status == Status.BUYING;
    }
    function isDelievering(Status status) external view onlyOwner returns (bool){
        return status == Status.PENDING;
    }
    function isSuccess(Status status) external view onlyOwner returns (bool){
        return status == Status.DELIVERING;
    }
    function isFail(Status status) external view onlyOwner returns (bool){
        return status == Status.SUCCESS;
    }
}
