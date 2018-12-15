import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home.js';
import NavBar from './component/NavBar.js'
import LoginPage from "./component/LoginPage.js"
import PostPage from "./component/PostPage.js"
import AccountPage from "./component/AccountPage.js"
import PlatformABI from './platform_abi.js'
import Web3 from 'web3';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: false,
      name:"",
      balance: 10,
      held_balance: 0,
      reputation: 0
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleListProfile = this.handleListProfile.bind(this);
    window.dexon.enable()
    const dexonProvider = window.dexon
    this.web3 = new Web3(dexonProvider)
    this.web3.eth.getAccounts().then(accounts => this.dexonAccount = accounts[0])
    let platformABI = PlatformABI;
    let platformAddress = '0x98707b826b4093d51e65c9445903d7859f7eef91';
    this.platformContract = new this.web3.eth.Contract(platformABI, platformAddress);
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
    var listProfile = this.platformContract.methods['listProfile']()
    listProfile.call({from: this.dexonAccount}).then((response) => {
      const [name, balance, held_balance, reputation] = response;
      console.log(balance)
      this.setState ({
        name: name,
        balance: balance,
        held_balance: held_balance,
        reputation: reputation
      }) 
    })
  }
  
  render() {
    const MyHomePage = (props) => {
      return (
          <div>
              <Home login={this.state.login} username={this.state.username} />
          </div>
      );
    };
    const MyNavBar = (props)=>{
      return(
        <NavBar login={this.state.login} account={this.state.account} manage={this.state.manage} handleLogout={this.handleLogout}/>
      )
    };
    const MyLoginPage = (props)=>{
      return(
        <LoginPage handleLogin={this.handleLogin} handleCreateUser={this.handleCreateUser}/>
      )
    };
    const MyPostPage = (props)=>{
      return(
        <PostPage name={this.state.name} id={props.match.params.order}/>
      )
    }
    const MyAccountPage = (props)=>{
      return(
        <AccountPage name={this.state.name} balance={this.state.balance} held_balance={this.held_balance} reputation={this.reputation} handleListProfile={this.handleListProfile}/>
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
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
