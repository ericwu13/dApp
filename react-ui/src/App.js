import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home.js';
import NavBar from './component/NavBar.js'
import LoginPage from "./component/LoginPage.js"
import PostPage from "./component/PostPage.js"
import ShopPage from "./component/ShopPage.js"
import DeveloperPage from "./component/DeveloperPage.js"
import CartPage from "./component/CartPage.js"

import AccountPage from "./component/AccountPage.js"
import DelieverPage from "./component/DelieverPage.js"
import PlatformABI from './platform_abi.js'
import Web3 from 'web3';

class App extends Component {
    constructor(props){
        super(props);
        // bind handlers
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleCheckUser = this.handleCheckUser.bind(this);
        this.handleListProfile = this.handleListProfile.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleTakeMission = this.handleTakeMission.bind(this);
        this.handlePend = this.handlePend.bind(this);
        this.updateContract = this.updateContract.bind(this);
        this.update = this.update.bind(this)
        this.sponsor= this.sponsor.bind(this)

        // init null dexon but not conntected
        window.dexon.enable()
        // console.log("Constructor")
        const dexonProvider = window.dexon
        this.web3 = new Web3(dexonProvider)
        this.platformABI = PlatformABI;
        this.state = {
            login: false,
            created: false,
            name : "",
            balance : 0,
            held_balance : 0,
            reputation : 0,
            platformAddress : '0xe061ccdefaa6d1ad4acaabffd57820e173f6eac1',
            platformContract : new this.web3.eth.Contract(this.platformABI, '0xe061ccdefaa6d1ad4acaabffd57820e173f6eac1'),
            items: [],
        };
        this.getAccount()
        this.handleCheckUser()

        // update pages for every 1000ms
        // declare constant
        this.updateTime = 1000
    }
    checkRoot() {
        return this.dexonAccount === '0x9b4bB121C6aA94481EDd92d2177deEaf620b76eA' 
    }

    updateContract(address) {
        // connect with dexon wallet
        if(this.checkRoot) {
            this.setState({
                platformAddress : address,
            });
            this.setState({
                platformContract : new this.web3.eth.Contract(this.platformABI, address)
            });
        } else {
            // console.log("You are not root")
        }
    }
    getAccount() {
        var promise = new Promise( (resolve, reject) => {
            // console.log("getAccount")
                if(this.dexonAccount === undefined) {
                    this.web3.eth.getAccounts().then(accounts => {
                        this.dexonAccount = accounts[0]
                        if(this.dexonAccount === "0x9b4bB121C6aA94481EDd92d2177deEaf620b76eA") {
                            // console.log("root mode")
                        }
                        resolve(this.dexonAccount)
                    })
                } else {
                    resolve("Promise resolved successfully");
                }
            }
        )
        return promise
    }

    componentDidMount() {
        this.update()
        setInterval(() => {this.update()}, this.updateTime)
    }
    
    update() {
        this.state.platformContract.methods.txDatabaseSize().call().then((txSize) => {
            for(let i = 0; i  < txSize; ++i) {
                this.state.platformContract.methods['txDatabase'](i).call().then((tx) => {
                    var b = false
                    var d = false
                    if(Number(tx._status)>= 2) {
                        b = true
                        d = true
                    } 
                    if(Number(tx._status) === 1) {
                        b = true
                    }
                    //console.log(b)
                    //console.log(tx._status)
                    const itemIndex = this.state.items.findIndex(item => item.index === tx._txId)
                    if (itemIndex !== -1 && (this.state.items[itemIndex].bought !== b || this.state.items[itemIndex].delivered !== d)) {
                        const newItems = [...this.state.items];
                        newItems[itemIndex] = {  
                            productName: tx._name,
                            description: "",
                            price: tx._value,
                            bought: b,
                            delivered: d,
                            index: tx._txId
                        };
                        this.setState({ items: newItems }) ;
                    } else if (itemIndex === -1) {
                        this.setState({
                            items: [...this.state.items, 
                                { 
                                    index: tx._txId,
                                    productName: tx._name,
                                    description: "",
                                    city:"",
                                    country:"",
                                    price: tx._value,
                                    bought: b,
                                    delivered: d,
                                }
                            ] 
                        })
                    }
                }) 
            }
        })
        this.handleListProfile();
    }

    handleLogin(e){
        this.setState({
            login: e.login
        });
    }
    
    handleLogout(){
        this.setState({
            login:false
        });
    }

    handleCreateUser(phone, name, created) {
        if(created) {
            this.handleLogin({ login: true });
        } else {
            var createUser = this.state.platformContract.methods['createUser']()
            this.state.platformContract.methods['guaranteedDeposit']().call()
            .then((value) => {
                createUser.send({from: this.dexonAccount, value: value})
                .on('confirmation', function(confirmationNumber, receipt){
                    console.log("login Success")
                    this.handleLogin({ login: true });
                })
            })
        }
            
    }

    handleEditName(name) {
        var editUserName = this.state.platformContract.methods['editUserName'](name)
        editUserName.send({from: this.dexonAccount})
        .on('confirmation', function(confirmationNumber, receipt){
            this.setState({
                name: name
            })
        })
    }
    handleCheckUser() {
        // console.log(this.dexonAccount)
        const httpWeb3 = new Web3(new Web3.providers.HttpProvider('http://testnet.dexon.org:8545'));
        const localContract = new httpWeb3.eth.Contract(this.platformABI, this.state.platformAddress); 
        var checkUser = localContract.methods['checkUser']()
        checkUser.call()
        .then((response) => {
            // console.log("CheckUser")
            // console.log(response)
            this.setState ({
                created: response,
                login: response
            }) 
            // console.log(this.state.login)
        })
    }

    handleListProfile() {
        this.getAccount()
        .then( (result) => {
                // console.log("listProfile")
                // console.log(result)
                const httpWeb3 = new Web3(new Web3.providers.HttpProvider('http://testnet.dexon.org:8545'));
                const localContract = new httpWeb3.eth.Contract(this.platformABI, this.state.platformAddress); 
                var listProfile = localContract.methods['listProfile'](this.dexonAccount)
                listProfile.call()
                .then((response) => {
                    // console.log("ListUser response")
                    // console.log(response)
                    this.setState ({
                        name: response[0],
                        balance: response[1],
                        held_balance: response[2],
                    }) 
                })
                // console.log(this.state.name)
            }
        )
    }
  
    handlePost(productName, description, price, base64) {
        var post = this.state.platformContract.methods['post'](productName, price)
        post.send({from: this.dexonAccount})
        .on('confirmation', function(confirmationNumber, receipt){
            this.state.platformContract.methods['txDatabaseSize']().call()
            .then( (id) => {
                const idx = id
                this.setState({
                    items: [...this.state.items, 
                        {  
                            productName,
                            description,
                            price,
                            bought: false,
                            delivered: false,
                            index: idx
                        }
                    ]
                })
            })
        })
    }

    handleBuy(txId) {
        // console.log(txId)
        const items = this.state.items.map((i) => {
                if (i.index!== txId) {
                    return i
                } else {
                    i.bought = true
                    // console.log(i.bought)
                    return i
                }
            });

        this.setState({
            items:  items
        })
        var buy = this.state.platformContract.methods['buy'](txId)
        buy.send({from: this.dexonAccount})
    }

    handleTakeMission(txId) {
        this.handlePend(txId)
        const items = this.state.items.map((i) => {
            if (i.index!== txId) {
                return i
            } else {
                i.delivered = true
                return i
            }
        });
        this.setState({
            items:  items
        })
    }
    handlePend(txId) {
        var pend = this.state.platformContract.methods['pend'](txId)
        pend.send({from: this.dexonAccount})
    }

    handleConfirmDeliever(txId) {
        var confirmDeliever = this.state.platformContract.methods['confirmDeliever'](txId)
        confirmDeliever.send({from: this.dexonAccount})
    }

    handleConfirmTx(txId) {
        var confirmTx = this.state.platformContract.methods['confirmTx'](txId)
        confirmTx.send({from: this.dexonAccount})
    }
    sponsor(value) {
        this.state.platformContract.methods['sponsor'](this.dexonAccount, value).send({from: this.dexonAccount})
    }
  
    render() {
        const MyHomePage = (props) => {
            return (
                <div>
                    <Home login={this.state.login} items={this.state.items} handleBuy={this.handleBuy}/>
                </div>
            );
        }
        const MyDeveloperPage = (props) => {
           return(
              <DeveloperPage  account={this.dexonAccount} updateContract={this.updateContract} sponsor={this.sponsor} currentAddress={this.state.platformAddress}/>
            )
        };
        const MyNavBar = (props)=>{
            return(
                <NavBar login={this.state.login} handleLogout={this.handleLogout}/>
            )
        };
        const MyLoginPage = (props)=>{
            return(
                <LoginPage handleCreateUser={this.handleCreateUser} userName={this.state.name}/>
            )
        };
        const MyPostPage = (props)=>{
            return(
                <PostPage handlePost={this.handlePost}/>
            )
        }
        const MyShopPage = (props)=>{
            return(
                <ShopPage id={props.match.params.id} items={this.state.items} handleBuy={this.handleBuy} />
            )
        }
        const MyAccountPage = (props)=>{
            return(
                <AccountPage name={this.state.name} balance={this.state.balance} held_balance={this.state.held_balance} reputation={this.reputation} handleEditName={this.handleEditName} handleListProfile={this.handleListProfile}/>
            )
        }
        const MyDelieverPage = (props)=>{
            return (
                <div>
                    <DelieverPage login={this.state.login} items={this.state.items} handleTakeMission={this.handleTakeMission}/>
                </div>
            )
        }

        const MyCartPage = (props)=>{
            return (
                <div>
                    <CartPage login={this.state.login} items={this.state.items} handleTakeMission={this.handleTakeMission}/>
                </div>
            )
        }
        return (
            <BrowserRouter>
                <div>
                    <Route path='/' render={MyNavBar}/>
                    <Route exact path='/' render={MyHomePage}/>
                    <Route path='/developer' render={MyDeveloperPage}/>
                    <Route path="/login" render={MyLoginPage}/>
                    <Route path="/post" render={MyPostPage}/>
                    <Route path="/shop/:id" render={MyShopPage}/>
                    <Route path="/account" render={MyAccountPage}/>
                    <Route path="/deliver" render={MyDelieverPage}/>
                    <Route path="/cart" render={MyCartPage}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
