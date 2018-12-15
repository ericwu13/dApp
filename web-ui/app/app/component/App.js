import React,{Component} from 'react';
import { BrowserRouter,Route,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './typewriter.css'
import './typewriter2.js';
import Home from './Home.js'


// 厭世 App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  handlesubmit


  render() {
    return (
      <BrowserRouter>
      <div>
      <Route exact path='/' component={Home}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;