import React, { Component } from 'react'
import { Grid, Card, Typography, CardActions, CardContent, CardMedia, CardHeader, Button, Fab, Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneIcon from '@material-ui/icons/Done';
import { Link } from 'react-router-dom';

import ix from './img/ixs.png'
import airpods from './img/airpods.png'

const IPFS = require('ipfs-http-client')
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol:'https'})

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locations:[],
            images:[]
        }
    }
    handleSubmit = index => {
        console.log("Cart confirm " + index)
        this.props.onClickItem(index)
    }
    timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = a.getMonth()
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ' ' + min + ' ' + sec ;
        return time;
    }
    calTimePassed = (itemPostTime) => {
        const dateofItem = this.timeConverter(itemPostTime).split(" ")
        var now = new Date().getTime(); 
        const dateofNow = this.timeConverter(now).split(" ")

        if(Number(dateofItem[2]) < Number(dateofNow[2])) {
            return (-Number(dateofItem[2]) + Number(dateofNow[2])).toString() + " Years ago"
        }
        if(Number(dateofItem[1]) < Number(dateofNow[1])) {
            return (-Number(dateofItem[1]) + Number(dateofNow[1])).toString() + " Months ago"
        }
        if(Number(dateofItem[0]) < Number(dateofNow[0])) {
            return (-Number(dateofItem[0]) + Number(dateofNow[0])).toString() + " Days ago"
        }
        if(Number(dateofItem[3]) < Number(dateofNow[3])) {
            return (-Number(dateofItem[3]) + Number(dateofNow[3])).toString() + " Hours ago"
        }
        if(Number(dateofItem[4]) < Number(dateofNow[4])) {
            return (-Number(dateofItem[4]) + Number(dateofNow[4])).toString() + " Minutes ago"
        }
        else{
            return (-Number(dateofItem[5]) + Number(dateofNow[5])).toString() + " Seconds ago"
        }
    }
    getIpfsData = (hash) => {
        
        var promise = new Promise( (resolve, reject) => {
            // console.log("getAccount")
            ipfs.cat(hash, (err, file) => {
                const string = file.toString()
                // console.log(file.toString('utf8').split('\\')[1])
                // console.log(string.split("\\"))
                resolve(string.split("\\"))
            })
            
        })
        
        return promise
    }
    render () {
        const { items , style, type } = this.props
        let deck_1 = []
        
        for(let i = 0; i < items.length; ++i) {
            let item = items[i]
            const time = this.calTimePassed(Number(item.postTime))
                let itemCard = 
                    <Grid key={item.index} item>
                        <Card style={style.card}>
                            {/* <CardActionArea>  */}
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" style={style.avatar}>
                                            {item.sellerNickName[0]}
                                        </Avatar>
                                    }
                                    title={item.sellerNickName + ", " + item.city + ", " + item.country}
                                    subheader={time}
                                    />
                                <CardMedia
                                    component="img"
                                    image={item.imgBase64}
                                    style={style.media}
                                    />
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {item.productName}
                                    </Typography>
                                    <Typography gutterBottom variant="h6">
                                        ${item.price}
                                    </Typography>
                                    {(item.status >= 3)?(item.status >= 4)?
                                        <Typography gutterBottom variant="subtitle1" style={{fontSize: 15, fontFamily:"Calibri", color:'#757575', fontStyle:'italic'}}>
                                        Arrived
                                        </Typography>:
                                        <Typography gutterBottom variant="subtitle1" style={{fontSize: 15, fontFamily:"Calibri", color:'#757575', fontStyle:'italic'}}>
                                            {item.driverNickName + " is Delivering ..."}
                                        </Typography>:
                                        <Typography gutterBottom variant="subtitle1" style={{fontSize: 15, fontFamily:"Calibri", color:'#757575', fontStyle:'italic'}}>
                                            Waiting For Deliver ...
                                        </Typography>
                                    }
                                    
                                </CardContent>
                            {/* </CardActionArea> */}
                            <CardActions style={style.actions} disableActionSpacing>
                                <IconButton onClick={() => {this.handleSubmit(item.index)}}>
                                {
                                    (item.status >= 4)?
                                    <DoneIcon style={{color: "#4caf50", fontSize:"30"}}/>:
                                    <DoneIcon style={{color: "#757575", fontSize:"30"}}/>
                                }
                                </IconButton>
                                {
                                    (item.status >= 3)?(item.status >= 4)?
                                    <LocalShippingIcon style={{color: "#757575", fontSize:"30"}}/>:
                                    <LocalShippingIcon style={{color: "#4caf50",fontSize:"30"}}/>:
                                    <LocalShippingIcon style={{color: "#757575", fontSize:"30"}}/>
                                }
                            </CardActions>
                        </Card>
                    </Grid>
            deck_1.push(itemCard);
            
        }
        return  <Grid container direction="column">
                    <Grid item sm>
                        <Paper style={{marginLeft: "auto", marginRight:"auto", padding: 20, width: "70%", height:'15vh'}} elevation="1">
                            <Typography variant='h3' style={{fontFamily:"Arial Rounded MT Bold"}}>
                                Your Cart List
                            </Typography>
                            <Typography variant='subtitle1' style={{marginTop:10, fontFamily:"Calibri", color:'#757575'}}>
                                Below are the items you have bought previous, please go to check out and click check symbol to confirm your delivery
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid container>
                        <Grid container direction="row" spacing="24" alignItems="flex-start" style={style.homeContainer}>
                                {deck_1}
                        </Grid>
                    </Grid>
                </Grid>
                
                       
        

    }
}
