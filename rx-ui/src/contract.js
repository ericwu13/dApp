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
   handleCreateUser(name) {
      this.platformContract.methods['createUser'](name)
      .send({from: web3.eth.accounts[0], value: value || undefined})
      .on('confirmation', () => {})
      .on('receipt', () => {
         console.log(`sucessfully performed createUser`);
      })
      .on('error', () => console.log('unexpected error'))

   }
   handlerlistProfile() {
      this.platformContract.methods['listProfile']()
      .call({from: web3.eth.accounts[0]})
      .on('receipt', () => {
         console.log(`sucessfully performed createUser`);
      })
      .on('error', () => console.log('unexpected error'))
   }

   handlePost(value) {

   }
   
   handleBuy() {

   }

   handleDeliever() {

   }

   handleDeliever() {

   }
}


export { PlatformHandler };
