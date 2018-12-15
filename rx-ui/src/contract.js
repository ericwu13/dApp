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
                this.platformContract.methods['guaranteedDeposit'].call({from: web3.eth.accounts[0]})
                .on((value) => {
                    createUser.send({from: web3.eth.accounts[0], value: value})
                })
                .on('error', () => console.log('unexpected error'))
            }
        })

    }

    handleEditName(name) {
        var editUserName = this.platformContract.methods['editUserName'](name)
        editUserName.send({from: web3.eth.accounts[0]})
        this.state.name = name
    }

    handleListProfile() {
        var listProfile = this.platformContract.methods['listProfile']()
        listProfile.call({from: web3.eth.accounts[0]}).then((response) => {
            const [name, balance, held_balance, reputation] = response;
            this.state.name = name
            this.state.balance = balance
            this.state.held_balance = held_balance
            this.state.reputation = reputation 
        })
    }

    handlePost(value) {
        var post = this.platformContract.methods['post'](txId)
        post.send({from: web3.eth.accounts[0]}).then((reponse) => {
            const [txId] = response
            this.state.txId = txId
        })
    }
   
    handleBuy(txId) {
        var buy = this.platformContract.methods['buy'](txId)
        buy.send({from: web3.eth.accounts[0]})
    }

    handlePend(txId) {
        var pend = this.platformContract.methods['pend'](txId)
        buy.send({from: web3.eth.accounts[0]})
    }

    handleConfirmDeliever(txId) {
        var confirmDeliever = this.platformContract.methods['confirmDeliever'](txId)
        confirmDeliever.send({from: web3.eth.accounts[0]})
    }

    handleConfirmTx(txId) {
        var confirmTx = this.platformContract.methods['confirmTx'](txId)
        confirmTx.send({from: web3.eth.accounts[0]})
    }
}


export { PlatformHandler };
