import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home.js';
import NavBar from './component/NavBar.js'
import LoginPage from "./component/LoginPage.js"
import PostPage from "./component/PostPage.js"
import PlatformABI from './platform_abi.js'
import Web3 from 'web3';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: true,
      account:'',
      manage:'',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
      login: e.login,
      account: e.account,
      manage: e.manage,
    });
  }
  handleLogout(){
    this.setState({
      login:false,
      account:'',
      manage:'',
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
    var listProfile = this.platformContract.methods['listProfile']()
    listProfile.call({from: this.dexonAccount}).then((response) => {
      const [name, balance, held_balance, reputation] = response;
      this.state.name = name
      this.state.balance = balance
      this.state.held_balance = held_balance 
      this.state.reputation = reputation 
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
        <LoginPage handleLogin={this.handleLogin}/>
      )
    };
    const MyPostPage = (props)=>{
      return(
        <PostPage account={this.state.account} id={props.match.params.order}/>
      )
    }
    return (
      <BrowserRouter>
      <div>
      <Route path='/' render={MyNavBar}/>
      <Route exact path='/' component={MyHomePage}/>
      <Route path="/login" render={MyLoginPage}/>
      <Route path="/post" render={MyPostPage}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
