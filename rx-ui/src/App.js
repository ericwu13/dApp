import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home.js';
import NavBar from './component/NavBar.js'
import LoginPage from "./component/LoginPage.js"
import PostPage from "./component/PostPage.js"

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
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
