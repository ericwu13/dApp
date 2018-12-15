import Web3 from 'web3';
import PlatformABI from './platform_abi.js'


class PlatformHandler {
    constructor() {
        window.dexon.enable()
        const dexonProvider = window.dexon
        this.web3 = new Web3(dexonProvider)
        this.web3.eth.getAccounts().then(accounts => this.dexonAccount = accounts[0])
        let platformABI = PlatformABI;
        let platformAddress = '0x98707b826b4093d51e65c9445903d7859f7eef91';
        this.platformContract = new this.web3.eth.Contract(platformABI, platformAddress);
    }
    handleCreateUser() {
        console.log(this.dexonAccount)
        var createUser = this.platformContract.methods['createUser']()
        this.platformContract.methods['_userProfiles'](this.dexonAccount).call().then((user) => {
            console.log(user[0])
            if(user[0] === "") {
                this.platformContract.methods['guaranteedDeposit']().call()
                .then((value) => {
                    createUser.send({from: this.dexonAccount, value: value})
                })
            }
        })
    }

    handleEditName(name) {
        var editUserName = this.platformContract.methods['editUserName'](name)
        editUserName.send({from: this.dexonAccount})
        this.state.name = name
    }

    handleListProfile() {
        var listProfile = this.platformContract.methods['listProfile']()
        listProfile.call({from: this.dexonAccount}).then((response) => {
            const [name, balance, held_balance, reputation] = response;
            this.state.name = name
            this.state.balance = balance
            this.state.held_balance = held_balance
            this.state.reputation = reputation 
        })
    }

    handlePost(value) {
        var post = this.platformContract.methods['post'](txId)
        post.send({from: this.dexonAccount}).then((reponse) => {
            const [txId] = response
            this.state.txId = txId
        })
    }
   
    handleBuy(txId) {
        var buy = this.platformContract.methods['buy'](txId)
        buy.send({from: this.dexonAccount})
    }

    handlePend(txId) {
        var pend = this.platformContract.methods['pend'](txId)
        buy.send({from: this.dexonAccount})
    }

    handleConfirmDeliever(txId) {
        var confirmDeliever = this.platformContract.methods['confirmDeliever'](txId)
        confirmDeliever.send({from: this.dexonAccount})
    }

    handleConfirmTx(txId) {
        var confirmTx = this.platformContract.methods['confirmTx'](txId)
        confirmTx.send({from: this.dexonAccount})
    }
}


export { PlatformHandler };
