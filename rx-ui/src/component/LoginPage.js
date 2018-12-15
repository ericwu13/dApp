import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

let errBar = <div><br/></div>;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
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
        ev.preventDefault();
        axios.post('/api/login', {
            account: this.state.account,
        })
            .then((res) => {
                if (res.data.valid === true){
                    this.setState({ redirect: true });
                    this.props.handleLogin({
                        login: true,
                        account: this.state.account,
                        manage: res.data.manage,
                    });
                }
                else {
                    this.setState({ error: true });
                }
            })
            .catch(function (err) {
                console.log(err);
            });
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
                            <label >Account</label>
                            <input type="text" class="form-control" id="account" value={this.state.account} onChange={this.handleAccountChange}/>
                        </div>
                        <div>{errBar}</div>
                        <button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleSubmit}>Login</button>
                        <br/>
                        <Link to='/register' style={{ textDecoration: 'none'}} ><button type='submit' class='btn btn-secondary btn-block'>Register</button></Link>
                    </form>
                </div>
                <div className='col-4'></div>
				
            </div>
        );
    }
}

export default LoginPage;