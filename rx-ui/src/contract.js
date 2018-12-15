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
        this.platformContract = web3.eth.contract(platformABI).at(platformAddress);
    }j
    handleCreateUser() {
        var createUser = this.platformContract.methods['createUser']()
        this.platformContract.methods['userProfiles'](web3.eth.accounts[0]).call().then((user) => {
            if(user._name)
        })
        this.platformContract.methods['guaranteedDeposit'].call().then((value) => {
            createUser.send({from: web3.eth.accounts[0], value: value})
            createUser.on('receipt', function(receipt){
            })
        })

        createUser.on('error', () => console.log('unexpected error'))
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
