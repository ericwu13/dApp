import React, { Component } from 'react'
import { Grid, Card, Typography, CardActions, CardContent, CardMedia, CardHeader, Button, CardActionArea, Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneIcon from '@material-ui/icons/Done';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';



const IPFS = require('ipfs-http-client')
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol:'https'})

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locations:[],
            images:[],
            deliverList: this.props.deliverList,
            loading: false,
            open: this.props.items.reduce((openList, item) => {
                openList.push(false)
                return openList
            }, [])
        }
    }
    sleep = (milliseconds) =>{ 
        var start = new Date().getTime(); 
        while(1)
            if ((new Date().getTime() - start) > milliseconds)
                break;
    }
    Transition = (props) => {
        return <Slide direction="up" {...props} />;
      }
      handleClickOpen = (i) => {
        console.log("Click")
        const open = this.state.open
        open[i] = true
        this.setState({ open: open});
    };

    handleClose = (i) => {
        console.log("Click")
        const open = this.state.open
        open[i] = false
        this.setState({ open: open});
    };
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        // this.forceUpdate();
        this.setState({deliverList: nextProps.deliverList});
        console.log(this.state.deliverList)
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

    render () {
        if(this.state.loading) {
            return 'Loading...'
        } else {
            const { items , style, type } = this.props
        let clickIcon, container
        if( type === 'homePage') {            
            clickIcon = <ShoppingCartIcon/>
            container = style.homeContainer
        } else if (type === 'deliverPage') {
            clickIcon = <LocalShippingIcon/>
            container = style.deliverContainer
        }
        let deck_1 = []
        
        for(let i = 0; i < items.length; ++i) {
            let item = items[i]
            const time = this.calTimePassed(Number(item.postTime))
            const deliverIndex = this.state.deliverList.findIndex((list) => list.txId === item.index)
            let itemCard = 
                <Grid key={item.index} item>
                    <Card style={style.card}>
                        
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" style={style.avatar}>
                                        {item.sellerNickName[0]}
                                    </Avatar>
                                }
                                title={item.buyerNickName + ", " + item.city + ", " + item.country}
                                subheader={time}
                                />
                        <CardActionArea> 
                            
                                <CardMedia
                                    component="img"
                                    image={item.imgBase64}
                                    style={style.media}
                                    onClick={() => {this.handleClickOpen(i)}}
                                    />
                            
                        </CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {item.productName}
                                </Typography>
                                <Typography gutterBottom variant="h6" sytle={{color:"#757575"}}>
                                    ${item.price}
                                </Typography>
                            </CardContent>
                        
                        <CardActions style={style.actions} disableActionSpacing>
                            {/* <IconButton onClick={() => {this.handleSubmit(item.index)}}>
                                <DoneIcon style={{color: "#4caf50", fontSize:"30"}}/>
                            </IconButton>
                            <Typography>
                                Click to confirm
                            </Typography> */}
                        </CardActions>
                    </Card>
                    <Dialog
                    fullScreen
                    open={this.state.open[i]}
                    onClose={() => {this.handleClose(i)}}
                    TransitionComponent={this.Transition}
                    >
                        <AppBar style={{ background: '#2F2F2F',position: 'relative' }}>
                            <Toolbar>
                            <IconButton color="inherit" onClick={() => {this.handleClose(i)}} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                {item.productName +" - Information"}
                            </Typography>
                            </Toolbar>
                        </AppBar>
                        <List>
                            <ListItem >
                                <ListItemText primary="Product Name" secondary={item.productName} />
                            </ListItem>
                            <Divider />
                            <ListItem >
                                <ListItemText primary="Description" secondary={item.description} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Seller Name" secondary={item.sellerNickName} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Seller Phone" secondary={this.state.deliverList[deliverIndex].sellerPhone}/>
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Buyer Name" secondary={item.sellerNickName} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Buyer Address" secondary={item.buyerCity + ", " + item.buyerCountry + ", " + this.state.deliverList[deliverIndex].buyerAddress} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Buyer Phone" secondary={this.state.deliverList[deliverIndex].buyerPhone} />
                            </ListItem>
                        </List>
                    </Dialog>
                </Grid>
            deck_1.push(itemCard);
            
            
        }
        // console.log(deck_1)
        // console.log("DONE")
        return  <Grid container justify="space-around"  direction="column">
                    <Grid item sm>
                        <Paper style={{marginLeft: "auto", marginRight:"auto", padding: 20, width: "70%", height:'15vh'}} elevation="1">
                            <Typography variant='h3' style={{fontFamily:"Arial Rounded MT Bold"}}>
                                Your Delivery List
                            </Typography>
                            <Typography variant='subtitle1' style={{marginTop:10, fontFamily:"Calibri", color:'#757575'}}>
                                Thanks for your delivery! Go to check out the buyer information to ship item to them.
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
}
