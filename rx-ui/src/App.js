import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home.js';
import NavBar from './component/NavBar.js'
import LoginPage from "./component/LoginPage.js"
import PostPage from "./component/PostPage.js"
import AccountPage from "./component/AccountPage.js"
import DeliverPage from "./component/DeliverPage.js"
import PlatformABI from './platform_abi.js'
import Web3 from 'web3';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: false,
      name : "",
      balance : 0,
      held_balance : 0,
      reputation : 0,
      items: [],
      idList: []
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleListProfile = this.handleListProfile.bind(this);
    this.handlePost = this.handlePost.bind(this);
    window.dexon.enable()
    const dexonProvider = window.dexon
    this.web3 = new Web3(dexonProvider)
    this.web3.eth.getAccounts().then(accounts => this.dexonAccount = accounts[0])
    this.platformABI = PlatformABI;
    this.platformAddress = '0x1C6487142F89A76699e5194f3D49BdF1f12a82e6';
    this.platformContract = new this.web3.eth.Contract(this.platformABI, this.platformAddress);
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
    post.send({from: this.dexonAccount}).then((response) => {
      const [txId] = response
      this.setState({
        idList: [...this.state.idList, txId]})
    })
  }

  handleBuy(txId) {
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
        <PostPage items={this.state.items} handlePost={this.handPost}/>
      )
    }
    const MyAccountPage = (props)=>{
      return(
        <AccountPage name={this.state.name} balance={this.state.balance} held_balance={this.state.held_balance} reputation={this.reputation} handleListProfile={this.handleListProfile}/>
      )
    }
    const MyDeliverPage = (props)=>{
      return(
        <DeliverPage name={this.state.name}/>
      )
    }
    return (
      <BrowserRouter>
      <div>
      <Route path='/' render={MyNavBar}/>
      <Route exact path='/' component={MyHomePage}/>
      <Route path="/login" render={MyLoginPage}/>
      <Route path="/post" render={MyPostPage}/>
      <Route path="/account" render={MyAccountPage}/>
      <Route path="/deliver" render={MyAccountPage}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
