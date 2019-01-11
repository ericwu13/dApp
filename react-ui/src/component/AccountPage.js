import React, { PureComponent } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Paper, Grid, Typography, Dialog, DialogTitle, Button, TextField } from '@material-ui/core'

class AccountPage extends PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          account:this.props.account,
          name:'',
          open: false,
          };
    }
    componentDidMount() {
        this.props.handleListProfile()

    }

    handleSave = () => {
        this.props.handleEditName(this.state.name)
        this.setState({name:'', open: false });
    }
    handleClickOpen = () => {
        this.setState({
          open: true,
        });
    };
    handleClose = () => {
        this.setState({name:'', open: false });
    };
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
            
        
        return (
            <Grid container >
                <Grid sm item style={{marginTop:10, marginLeft:20, marginRight:20}}>
                    {/* <Paper style={{padding:20, marginTop:'2%', marginLeft:'15%', marginRight:'15%', marginBottom:'1%'}}> */}

                    
                        <Paper style={{padding:20, marginTop:'2%', marginLeft:'15%', marginRight:'15%', marginBottom:'1%'}} elevation='0'>
                            <Typography variant='h4' style={{textAlign: 'center', fontFamily:"Arial Rounded MT Bold"}} justify="center" alignItems="center">
                                User Account Information
                            </Typography>
                        </Paper>
                        <Paper style={{padding:20, marginLeft:'15%', marginRight:'15%'}} elevation='1'>
                            <Typography variant='h5'>
                                User Name 
                            </Typography>
                            <Grid container justify="space-between">
                                <Grid item>

                                    <Typography variant='subtitle1' style={{color:'#757575'}}>
                                        {this.props.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button size="small" variant="outlined" color="primary" onClick={this.handleClickOpen}/*style={{marginLeft:'65%', marginRight:'5%'}}*/ >
                                        EDIT NAME
                                    </Button>
                                </Grid>
                                
                            </Grid>                                        
                        </Paper>
                        <Paper style={{padding:20, marginLeft:'15%', marginRight:'15%'}} elevation='1'>
                            <Typography variant='h5'>
                                Phone Number
                            </Typography> 
                            <Typography variant='subtitle1' style={{color:'#757575'}}>
                                09092941238
                            </Typography>                                            
                        </Paper>
                        <Paper style={{padding:20, marginLeft:'15%', marginRight:'15%'}} elevation='1'>
                            <Typography variant='h5'>
                                Balance
                            </Typography> 
                            <Typography variant='subtitle1' style={{color:'#757575'}}>
                                {this.props.balance}
                            </Typography>                                            
                        </Paper>
                        <Paper style={{padding:20, marginBottom:'2%', marginLeft:'15%', marginRight:'15%'}} elevation='1'>
                            <Typography variant='h5'>
                                Cash Held
                            </Typography>
                            <Typography variant='subtitle1' style={{color:'#757575'}}>
                                {this.props.held_balance}
                            </Typography>
                        </Paper>
                        {/* <Typography>
                                    <button type="button" class="btn btn-outline-secondary btn-block" data-toggle="modal" data-target="#nameBox">Edit Name</button>
                        </Typography>
                        {pop_up} */}
                        
                            <Dialog open={this.state.open} onClose={this.handleClose}>
                                <DialogTitle id="simple-dialog-title">Type in your name</DialogTitle>
                                <div>
                                <TextField
                                    id="standard-name"
                                    label="Name"
                                    style={{marginLeft:25, marginRight:25, marginBottom:50}}
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                    />
                                <Button variant="outlined" color="primary" onClick={this.handleSave} style={{marginLeft:25, marginRight:25, marginBottom:50}}>
                                    SAVE
                                </Button>

                                </div>
                            </Dialog>                        
                        {/* </Paper> */}
                </Grid>
            </Grid>
        );
    }
}
export default AccountPage;