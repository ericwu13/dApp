import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

let errBar = <div><br/></div>;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            error: false,
        };

        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAccountChange(ev) {
        this.setState({ account: ev.target.value });
    }

    handleSubmit(ev) {
        //window.dexon.enable();
        this.props.handleCreateUser();
        this.setState({ redirect: true });
    }
    

    render() {
        if (this.state.redirect){
            return <Redirect push to='/'/>;
        }
        if (this.state.error){
            errBar = (
                <div class="alert alert-danger" role="alert">
					Account or Password error!
                </div>
            );
        }
        else {
            errBar = (
                <div><br/></div>
            );
        }
        let pop_up =
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Warning!</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h6>You are going to connect to Dexon now.</h6>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.handleSubmit}>Launch</button>
                        </div>
                    </div>
                </div>
            </div>

        return (
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <br/>
                    <br/>
                    <form>
                        <div class="form-group">
                        </div>
                        <div>{errBar}</div>
                        <button type="button" class="btn btn-outline-secondary btn-block" data-toggle="modal" data-target="#exampleModalCenter">Connect with Dexon Wallet</button>
                        {pop_up}
                        <br/>
                    </form>
                </div>
                <div className='col-4'></div>
            </div>
        );
    }
}

export default LoginPage;