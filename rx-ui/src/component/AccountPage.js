import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            name : this.props.name,
            balance : this.props.balance,
            held_balance : this.props.held_balance,
        };
    }
    render() {
        this.props.handleListProfile()
        let user_info =
            <div class="">
                    <h3 class="card-title" id="user">Hi! {this.props.name}.</h3>
                    <h5 class="card-title">You've got {this.state.balance} .</h5>
                    <h5 class="card-title">You've cost {this.state.held_balance} .</h5>
            </div>;  
            
        
        return (
            <div class="row">
                <div class="col col-lg-7 margin-left margin-top">
                    <h3>Profile</h3>
                    <ul class='list-group list-group-flush margin-top'>
                    </ul>
                </div>
                <div class="col-lg-4">
                    <br/>
                    <br/>
                    <br/>
                    <ul class='list-group list-group-flush'>
                        {user_info}
                    </ul>
                </div>
            </div>
        );
    }
}
export default AccountPage;