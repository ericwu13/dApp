var PrintAddress= artifacts.require("./PrintAddress.sol");

module.exports = function(deployer) {
  deployer.deploy(PrintAddress);
};
