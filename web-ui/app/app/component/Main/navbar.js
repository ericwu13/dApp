import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

//import images
import logo from '../favicon.png';

const brandStyle = {color: '#fff', cursor: 'default'};

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    render() {
        let navBar_left;

        return (
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark navbar-static-top" >
                <a class="navbar-brand" >
                    <Link to=''><img src={logo} width="120"  alt=""/></Link>
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav mr-auto">
                        <Link to='/about'><a class="nav-item nav-link brandStyle" >About</a></Link>
                        <Link to='/messenger'><a class="nav-item nav-link">Messenger</a></Link>
                    </div>
                    {navBar_left}
                </div>
            </nav>
        );
    }
}

export default NavBar;