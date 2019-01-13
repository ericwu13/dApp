import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import ItemList from './ItemList'
import { CardStyles } from './Style'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';
import iphonexs from './img/ixs.png';
import airpods from './img/airpods.png'
class DelieverPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit (ev){
        this.props.handleTakeMission(ev.target.value)
    }
    render() {
        
        return (
            <Grid container justify="space-around"  direction="row">
                <Grid item sm>
                    <Paper style={{height: 300, overflow: 'auto', marginTop: 32, marginLeft: '5%', padding: 20}}>
                        <Typography variant='h3' style={{fontFamily:"Arial Rounded MT Bold"}}>
                            Welcome to Delivery Page!
                        </Typography>
                        <Typography variant='subtitle1' style={{marginTop: 20, fontFamily:"Calibri", color:'#757575'}}>
                            In our platform, we'll do our best to maintain your items integrity and provide best user experience for user to enjoy. 
                            We sincerely thanks for your willingness to become a deliver for BShop, and because of your copoperation, all of the users can enjoy the best service they would not have before.
                        </Typography>
                    </Paper>
                    <Paper style={{height: 600, overflow: 'auto', marginTop: 32, marginLeft: '5%', padding: 20}}>
                        <Typography variant='h3' style={{fontFamily:"Arial Rounded MT Bold"}}>
                            Deliver to Make Money
                        </Typography>

                        <Typography variant='h5' style={{marginTop: 20}}>
                            How to Make Money?
                        </Typography>
                        <Typography variant='subtitle1' style={{marginTop: 20, fontFamily:"Calibri", color:'#757575'}}>
                            In our BShop, one can help deliver an item, bought by other users, to make a fortune!
                            <br/>
                            All you Need is yo DELIVER RIGHT NOW!!!!
                        </Typography>
                        <Typography variant='h5' style={{marginTop: 20}}>
                            Deliver an Item
                        </Typography>
                        <Typography variant='subtitle1' style={{marginTop: 20, fontFamily:"Calibri", color:'#757575'}}>
                            Look for items whose location is the nearest to you, and click the DELIVER ICON.
                            <br/>
                            But make sure your account has enough money since we'll lock portion of your money to maintain integrity of our system.
                        </Typography>
                        <Typography variant='h5' style={{marginTop: 20}}>
                            Check Your Deliver List
                        </Typography>
                        <Typography variant='subtitle1' style={{marginTop: 20,fontFamily:"Calibri", color:'#757575'}}>
                            Go to CART to check you deliver list.
                        </Typography>


                    </Paper>
                </Grid>
                <Grid container style={{maxWidth:"55%"}}>
                    {/* <Paper>
                        THIS
                    </Paper> */}
                    <ItemList   items={this.props.items.reduce((itemList, item) => {
                                        if(item.status !== 1) {
                                            return itemList
                                        } else {
                                            itemList.push(item)
                                            return itemList
                                        }
                                    }, [])}
                                style={CardStyles} 
                                handleGetName={this.props.handleGetName}
                                onClickItem={this.props.handleTakeMission} 
                                type='deliverPage'/>
                </Grid>
            </Grid>
        );
    }
}

export default DelieverPage