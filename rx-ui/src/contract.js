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
        this.platformContract.methods['_userProfiles'].call().then((users) => {
            if(users[web3.eth.accounts[0]]._name === "") {
                this.platformContract.methods['guaranteedDeposit'].call()
                .on((value) => {
                    createUser.send({from: web3.eth.accounts[0], value: value})
                })
                .on('error', () => console.log('unexpected error'))
            }
        })

    }

    handleEditName(name) {
        var editName = this.platformContract.methods['editName'](name)
        editName.send({from: web3.eth.accounts[0]})
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
