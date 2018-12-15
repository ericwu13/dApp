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
        this.props.handleCreateUser();
        this.props.handleLogin({ login: true });
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
                        <button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleSubmit}>GO!</button>
                        <br/>
                    </form>
                </div>
                <div className='col-4'></div>
				
            </div>
        );
    }
}

export default LoginPage;