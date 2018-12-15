pragma solidity ^0.4.25;

contract CStatus {
    
    //define Status
    enum Status {POSTING, BUYING, PENDING, DELIVERING, SUCCESS, FAIL}

    //function for status
    function isPosting(Status _status) view returns (bool){
        return _status == Status.POSTING;
    }
    function isBuying(Status _status) view returns (bool){
        return _status == Status.BUYING;
    }
    function isDelievering(Status _status) view returns (bool){
        return _status == Status.PENDING;
    }
    function isSuccess(Status _status) view returns (bool){
        return _status == Status.DELIVERING;
    }
    function isFail(Status _status) view returns (bool){
        return _status == Status.SUCCESS;
    }
}
