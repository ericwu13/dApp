import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Button, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Store from '@material-ui/icons/Store';
//import images
import logo_1 from '../logo.png';

const brandStyle = {color: '#fff', cursor: 'default'};

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    render() {
        this.handle
        let navBar_left;
        if ( this.props.login ) {
            navBar_left = <div>
                            <Link to={'/cart'}>
                                <Button style={{margin:5, color: "#f5f5f5"}}>
                                    <ShoppingCartIcon style={{ fontSize: 27 }}/>
                                </Button>
                            </Link> 
                            <Link to={'/account'}>
                                <Button style={{margin:5, color: "#f5f5f5"}}>
                                    <AccountCircle style={{ fontSize: 27 }}/>
                                </Button>
                            </Link> 
                            <Link to={'/deliver'}>
                                <Button style={{margin:5, color: "#f5f5f5"}}>
                                    <LocalShippingIcon style={{ fontSize: 27 }}/>
                                </Button>                        
                            </Link> 
                            <Link to={'/post'}>
                                <Button style={{margin:5, color: "#f5f5f5"}}>
                                    <Store style={{ fontSize: 27 }}/>
                                </Button>                        
                            </Link> 
                            <Link to={'/'}>
                                <Button style={{margin:5, color: "#f5f5f5"}} onClick={this.props.handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} size="2x"/>
                                </Button>
                            </Link> 
                        </div>
        } else {
            navBar_left = <div>
                            <Link to='/login'>
                                <Button style={{margin:5, color: "#f5f5f5"}}>
                                    <FontAwesomeIcon icon={faSignInAlt} size="2x"/>
                                </Button>
                            </Link>
                        </div>
        }
        return <AppBar position="static" style={{ background: '#2F2F2F' }}>
                    <Toolbar>
                        <a class="navbar-brand" >
                           <Link to='/'><img src={logo_1} width="60"  alt=""/></Link>
                         </a>
                        
                        <Link to='/about'>
                            <Button style={{margin:5, color: "#f5f5f5"}}>
                                <Typography variant="h6" color="inherit" noWrap style={{fontFamily: "Andale Mono"}}>
                                    About
                                </Typography>    
                            </Button>
                        </Link>
                        <Link to='/developer'>
                            <Button style={{margin:5, color: "#f5f5f5"}}>
                                <Typography variant="h6" color="inherit" noWrap style={{fontFamily: "Andale Mono"}}>
                                    Developer
                                </Typography>
                            </Button>
                        </Link>
                        <div/>
                        <div style={{flexGrow: 1}} />
                        
                                {navBar_left}
                        
                    </Toolbar>
                </AppBar>
        // return <nav class="navbar navbar-expand-sm navbar-dark navbar-my navbar-static-top" >
        //             <a class="navbar-brand" >
        
        //             </a>
        //             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span class="navbar-toggler-icon"></span>
        //             </button>
        //             <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        //                 <div class="navbar-nav mr-auto">
        
        //                 </div> 
        //                 {navBar_left}
        //             </div>
        //         </nav>
    }
}

export default NavBar;