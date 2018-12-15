import Web3 from 'web3';
import { PlatformABI } from './platform_abi.js'


class PlatformHandler {
   constructor() {
      window.dexon.enable()
      const dexonProvider = window.dexon
      const web3 = new Web3(dexonProvider)
      //web3.eth.defaultAccount = web3.eth.accounts[0]
      let platformABI = PlatformABI;
      let platformAddress = '0x42b9991505950cc5ac38a6557d8efcdc40235de6';
      const platformContract = web3.eth.contract(platformABI).at(platformAddress);
   }
}


export { PlatformHandler };
