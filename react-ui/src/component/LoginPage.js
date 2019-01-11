import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, DialogActions, DialogContent, DialogContentText, Button, TextField, DialogTitle, Dialog } from '@material-ui/core'

let errBar = <div><br/></div>;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            error: false,
            created: false,
            phone: '',
            name:''
        }
    }
    handleChange = prop  => event => {
        this.setState({ [prop]: event.target.value });
    };


    handleSubmit = () => {
        //window.dexon.enable();
        if(this.props.userName === "") {
           this.props.handleCreateUser(this.state.phone, this.state.name, false);
        } else {
            this.props.handleCreateUser(this.state.phone, this.state.name, true);
        }
        this.setState({ redirect: true });
    }
    componentDidMount() {
        if(this.props.userName !== "") {
            this.setState({created: true})
        }
    }
    

    render() {
        if (this.state.redirect){
            return <Redirect push to='/'/>;
        }
        let created =
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Let's Shopping Right Now!!</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* <div class="modal-body">
                            <h6>You are going to login to BShop</h6>
                        </div> */}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.handleSubmit}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        let noCreated =
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">You Have no Account in BShop</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Grid container direction='column' spacing={24} justify='space-around'>
                                <Grid item>
                                    Create Your Personal Shopping Experience!
                                </Grid>
                                <Grid item>
                                    <TextField
                                    id="outlined-adornment-productName"
                                    variant="outlined"
                                    label="Your Name"
                                    value={this.state.name}
                                    onChange={this.handleChange('phone')}
                                    fullWidth
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                    id="outlined-adornment-productName"
                                    variant="outlined"
                                    label="Your Phone Number"
                                    value={this.state.phone}
                                    onChange={this.handleChange('phone')}
                                    fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.handleSubmit}>Continue</button>
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
                    {this.props.userName !== "" ? <form>
                                            <div class="form-group">
                                            </div>
                                            <div>{errBar}</div>
                                            <button type="button" class="btn btn-outline-secondary btn-block" data-toggle="modal" data-target="#exampleModalCenter">Login</button>
                                            {created}
                                            <br/>
                            </form>: <div>
                                           <div class="form-group">
                                            </div>
                                            <div>{errBar}</div>
                                            <button type="button" class="btn btn-outline-secondary btn-block" data-toggle="modal" data-target="#exampleModalCenter">Login</button>
                                            {noCreated}
                                            <br/>

                                    </div>
                    }
                </div>
                <div className='col-4'></div>
            </div>
        );
    }
}

export default LoginPage;