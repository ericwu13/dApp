import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home.js';
import NavBar from './component/NavBar.js'
import LoginPage from "./component/LoginPage.js"
import PostPage from "./component/PostPage.js"
import ShopPage from "./component/ShopPage.js"

import AccountPage from "./component/AccountPage.js"
import DelieverPage from "./component/DelieverPage.js"
import PlatformABI from './platform_abi.js'
import Web3 from 'web3';
import { timingSafeEqual } from 'crypto';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: false,
      name : "",
      balance : 0,
      held_balance : 0,
      reputation : 0,
      items: []
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleListProfile = this.handleListProfile.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleItemAppend = this.handleItemAppend.bind(this);
    window.dexon.enable()
    const dexonProvider = window.dexon
    this.web3 = new Web3(dexonProvider)
    this.platformABI = PlatformABI;
    this.platformAddress = '0x59d5ede0c7531e2c10eda083b15645ca64998dce';
    this.platformContract = new this.web3.eth.Contract(this.platformABI, this.platformAddress);
    this.web3.eth.getAccounts().then(accounts => {
      this.dexonAccount = accounts[0]
      console.log(this.dexonAccount)
      if(this.dexonAccount === "0x9b4bB121C6aA94481EDd92d2177deEaf620b76eA") {
        console.log("send")
        //this.platformContract.methods['sponsor'](this.dexonAccount, 10000000).send({from: this.dexonAccount})
      }
    })
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

  handleItemAppend(productName, description, price) {
    this.handlePost(price)
    this.platformContract.methods['txDatabaseSize']().call()
    .then( (id) => {
    const idx = id
    this.setState({
        items: [...this.state.items, {productName,
                                    description,
                                    price,
                                    bought: false,
                                    delievered: false,
                                    index: idx}]
                                  })
                                }
                       )
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
    console.log(this.dexonAccount)
    const httpWeb3 = new Web3(new Web3.providers.HttpProvider('http://testnet.dexon.org:8545'));
    const localContract = new httpWeb3.eth.Contract(this.platformABI, this.platformAddress); 
    var listProfile = localContract.methods['listProfile'](this.dexonAccount)
    listProfile.call()
    .then((response) => {
      console.log(response[1])
      this.setState ({
        name: response[0],
        balance: response[1],
        held_balance: response[2],
      }) 
    })
  }
  
  handlePost(value) {
    var post = this.platformContract.methods['post'](value)
    console.log("Post")
    post.send({from: this.dexonAccount}).then((response) => {
      console.log(response)
      const [txId] = response
      console.log(txId)
    })
  }

  handleBuy(txId) {
    console.log(txId)
    const items = this.state.items.map((i) => {
      if (i.index!== txId) {
        return i
      } else {
        i.bought = true
        console.log(i.bought)
        return i
      }
    });

    this.setState({
      items:  items
    })
    var buy = this.platformContract.methods['buy'](txId)
    buy.send({from: this.dexonAccount})
  }

  handlePend(txId) {
    var pend = this.platformContract.methods['pend'](txId)
    pend.send({from: this.dexonAccount})
  }

  handleConfirmDeliever(txId) {
    var confirmDeliever = this.platformContract.methods['confirmDeliever'](txId)
    confirmDeliever.send({from: this.dexonAccount})
  }

  handleConfirmTx(txId) {
    var confirmTx = this.platformContract.methods['confirmTx'](txId)
    confirmTx.send({from: this.dexonAccount})
  }
  
  render() {
    const MyHomePage = (props) => {
      return (
          <div>
              <Home login={this.state.login} items={this.state.items} />
          </div>
      );
    };
    const MyNavBar = (props)=>{
      return(
        <NavBar login={this.state.login} handleLogout={this.handleLogout}/>
      )
    };
    const MyLoginPage = (props)=>{
      return(
        <LoginPage handleLogin={this.handleLogin} handleCreateUser={this.handleCreateUser}/>
      )
    };
    const MyPostPage = (props)=>{
      return(
        <PostPage handleItemAppend={this.handleItemAppend}/>
      )
    }
    const MyShopPage = (props)=>{
      return(
        <ShopPage id={props.match.params.id} items={this.state.items} handleBuy={this.handleBuy} />
      )
    }
    const MyAccountPage = (props)=>{
      return(
        <AccountPage name={this.state.name} balance={this.state.balance} held_balance={this.state.held_balance} reputation={this.reputation} handleListProfile={this.handleListProfile}/>
      )
    }
    const MyDelieverPage = (props)=>{
      return (
          <div>
              <DelieverPage login={this.state.login} items={this.state.items} />
          </div>
      )
    }
    return (
      <BrowserRouter>
      <div>
      <Route path='/' render={MyNavBar}/>
      <Route exact path='/' component={MyHomePage}/>
      <Route path="/login" render={MyLoginPage}/>
      <Route path="/post" render={MyPostPage}/>
      <Route path="/shop/:id" render={MyShopPage}/>
      <Route exact path="/account" render={MyAccountPage}/>
      <Route path="/deliever" render={MyDelieverPage}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
