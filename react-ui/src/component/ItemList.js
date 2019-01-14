import React, { Component } from 'react'
import { Grid, Card, Typography, CardActions, CardContent, CardActionArea, CardMedia, CardHeader, Button, Fab} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ix from './img/ixs.png'
import airpods from './img/airpods.png'



export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locations:[],
            images:[],
            open: this.props.items.reduce((openList, item) => {
                openList.push(false)
                return openList
            }, []),
            userOpen: this.props.items.reduce((openList, item) => {
                openList.push(false)
                return openList
                }, []),
        }
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

    handleUserInfoOpen = (i) => {
        console.log("Click")
        const open = this.state.userOpen
        open[i] = true
        this.setState({ userOpen: open});
    };

    handleUserInfoClose = (i) => {
        console.log("Click")
        const open = this.state.userOpen
        open[i] = false
        this.setState({ userOpen: open});
    };
    

    handleSubmit = index => {
        console.log(index)
        if(this.props.type === 'homePage') {
            this.props.onClickItem(index, "0", "0")
        } else if(this.props.type === 'deliverPage'){
            this.props.onClickItem(index)
        }
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
        const { items , style, type } = this.props
        let clickIcon, container
        if( type === 'homePage') {            
            container = style.homeContainer
        } else if (type === 'deliverPage') {
            
            container = style.deliverContainer
        }
        let deck_1 = []
        for(let i = 0; i < items.length; ++i) {
            let item = items[i]
            // this.getIpfsData(item.ipfsHash)
            // .then((string) => {
            //     this.setState({
            //         locations:[...this.state.locations, {string:string[1] + ", " + string[2], index:item.index}],
            //         images:[...this.state.images, {string:string[0], index:item.index}]
            //     })
            // })
                const time = this.calTimePassed(Number(item.postTime))
                let itemCard = 
                    <Grid key={item.index} item>
                        <Card style={style.card}>
                            {/* <CardActionArea>  */}
                                {(type === "homePage")?<CardActionArea>
                                    <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" style={style.avatar}>
                                            {type === 'homePage'?item.sellerNickName[0]:item.buyerNickName[0]}
                                        </Avatar>
                                    }
                                    title={type === 'homePage'?item.sellerNickName + ", " + item.city + ", " + item.country:
                                                                item.buyerNickName + ", " + item.buyerCity + ", " + item.buyerCountry}
                                    subheader={time}
                                    onClick={ () => this.handleUserInfoOpen(i)}
                                    /></CardActionArea>:<CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" style={style.avatar}>
                                            {type === 'homePage'?item.sellerNickName[0]:item.buyerNickName[0]}
                                        </Avatar>
                                    }
                                    title={type === 'homePage'?item.sellerNickName + ", " + item.city + ", " + item.country:
                                                                item.buyerNickName + ", " + item.buyerCity + ", " + item.buyerCountry}
                                    subheader={time}/>
                                }
                                {(type === "homePage")?
                                        <CardMedia
                                        component='img'
                                        image={item.imgBase64}
                                        style={style.media}
                                        />:
                                        <CardActionArea>
                                            <CardMedia
                                            component='img'
                                            image={item.imgBase64}
                                            style={style.media}
                                            onClick={() => this.handleClickOpen(i)}
                                            />  
                                        </CardActionArea>

                                }
                                
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {item.productName}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" style={{color:"#757575"}}>
                                        ${item.price}
                                    </Typography>
                                </CardContent>
                            {/* </CardActionArea> */}
                            <CardActions style={style.actions} disableActionSpacing>
                                    {(type === 'homePage')?
                                        <IconButton component={Link} to={'/shop/'+item.index}>
                                            {/* <Link to={'/shop/'+item.index} > */}
                                                <ShoppingCartIcon style={{fontSize:"30", color:"#7f7f7f"}}/>
                                            {/* </Link> */}
                                        </IconButton>:
                                        
                                        <IconButton onClick={() => {this.handleSubmit(item.index)}}>
                                            <LocalShippingIcon style={{fontSize:"30"}}/>
                                        </IconButton>
                                    }
                                <IconButton aria-label="Love">
                                    <FavoriteIcon style={{fontSize:"30"}}/>
                                </IconButton>
                            </CardActions>
                        </Card>
                        <Dialog
                        fullScreen
                        open={this.state.open[i]}
                        onClose={() => this.handleClose(i)}
                        TransitionComponent={this.Transition}
                        >
                            <AppBar style={{ background: '#2F2F2F',position: 'relative' }}>
                                <Toolbar>
                                <IconButton color="inherit" onClick={() => this.handleClose(i)} aria-label="Close">
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
                                    <ListItemText primary="Seller Address" secondary={item.city + ", " + item.country} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary="Seller Phone" secondary={item.phone} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary="Buyer Name" secondary={item.buyerNickName} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary="Buyer Address" secondary={item.buyerCity + ", " + item.buyerCountry + ", " + item.buyerEncyrpted} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary="Buyer Phone" secondary={item.phone} />
                                </ListItem>
                            </List>
                        </Dialog>
                        <Dialog
                        fullScreen
                        open={this.state.userOpen[i]}
                        onClose={() => this.handleUserInfoClose(i)}
                        TransitionComponent={this.Transition}
                        >
                            <AppBar style={{ background: '#2F2F2F',position: 'relative' }}>
                                <Toolbar>
                                <IconButton color="inherit" onClick={() => this.handleUserInfoClose(i)} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit">
                                    {"Seller - Information"}
                                </Typography>
                                </Toolbar>
                            </AppBar>
                            <List>
                                <ListItem >
                                    <ListItemText primary="Seller Name " secondary={item.sellerNickName} />
                                </ListItem>
                                <Divider />
                                <ListItem >
                                    <ListItemText primary="Seller Sales Repuatation" secondary={item.sellerReputation} />
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary="Seller Deliver Reputation" secondary={item.deliveryReputation} />
                                </ListItem>
                            </List>
                        </Dialog>
                    </Grid>
            deck_1.push(itemCard);
            
        }
        // console.log(deck_1)
        // console.log("DONE")
        return  <Grid container direction="row" spacing="24" alignItems="flex-start" style={container}>
                    {deck_1}
               </Grid>
                
                       
        

    }
}
