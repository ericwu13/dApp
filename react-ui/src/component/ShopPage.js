import React, {Fragment} from 'react';
import red from '@material-ui/core/colors/red';
import { Link, Redirect } from 'react-router-dom';
import request from 'superagent';
import './Style.css';
import iphonexs from './img/ixs.png';
import airpods from './img/airpods.png'
import { Grid, Card, Typography, CardActions, CardContent, CardMedia, CardHeader, Button, Fab} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import { Paper, InputAdornment, OutlinedInput, Select, TextField } from '@material-ui/core'
import { unstable_Box as Box } from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import {encrypt, decrypt} from "./Encrypt"

const IPFS = require('ipfs-http-client')
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol:'https'})

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            buyerCity: "",
            buyerCountry: "",
            buyerAddress1: "",
            arrivalTime: "",
            buffer: '',
            buyerPhone:'',
            redirect:false
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
    convertToBuffer = async(reader) => {
        //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader);
        this.setState({buffer});
    }
    handleSubmit = async () => {
        const encrytedData = encrypt(this.state.buyerAddress1 + "\\" + this.state.buyerPhone)
        // console.log(decrypt(encrytedData[0], encrytedData[1]))
        
        console.log("Submit to IPFS")
        const buffer = await Buffer.from(this.state.buyerCity+"\\"+this.state.buyerCountry+"\\"+ encrytedData[0]);
        this.setState({buffer});
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(err,ipfsHash);
          
            //setState by setting ipfsHash to ipfsHash[0].hash 
            this.setState({ ipfsHash:ipfsHash[0].hash });
            // ipfs.get(this.state.ipfsHash, (err, files) => {
            //   files.forEach((file) => {
            //       this.setState({
            //           base64:file.content.toString('utf8')
            //       })
            //       this.setState({redirect:true})
            //   })
            // })
            // this.props.handlePost(this.state.productName, this.state.description, this.state.price, this.state.ipfsHash)
            this.props.handleBuy(this.props.id, encrytedData[1], ipfsHash[0].hash)
            this.setState({redirect:true})
        }) //await ipfs.add 
    }
    handleChange = prop  => event => {
        this.setState({ [prop]: event.target.value });
    };
    render() {
        var item;
        for(let i=0; i<this.props.items.length; ++i){
            if(this.props.items[i].index === this.props.id) {
                item = this.props.items[i]
            }
            
        }
        const time = this.calTimePassed(Number(item.postTime))
        let itemCard = <Card style={{width: 400, maxHeight: '90vh'}}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" style={{backgroundColor: red[500]}}>
                                        {item.sellerNickName[0]}
                                    </Avatar>
                                }
                                title={item.sellerNickName + ", " + item.city + ", " + item.country}
                                subheader={time}
                                />
                            <CardMedia
                                component='img'
                                image={item.imgBase64}
                                style={{maxWidth: 400, height: 'auto', width: 'auto', margin:'auto'}} // 16:9}
                                />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    Product Description
                                </Typography>
                                {/* <Paper style={{padding:10, marginBottom:20}} elevation='0'> */}
                                    <Typography gutterBottom variant="subtitle1" style={{color:'#757575', borderRadius:16}}>
                                        {" "+item.description}
                                    </Typography>
                                {/* </Paper> */}
                                {/* <Box borderRadius={16} clone>
                                    <Typography gutterBottom variant="subtitle1" style={{color:'#757575'}}>
                                        {item.description}
                                    </Typography>
                                </Box> */}
                                
                                <Typography gutterBottom variant="h6">
                                    {item.productName}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" style={{color:"#757575"}}>
                                    ${item.price}
                                </Typography>
                                <Typography gutterBottom variant="h6">
                                    Poster
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" style={{color:"#757575"}}>
                                    {item.sellerNickName + ", " + item.city + ", " + item.country}
                                </Typography>
                                
                            </CardContent>
                        {/* </CardActionArea> */}
                        {/* <CardActions style={style.actions} disableActionSpacing>
                            <IconButton aria-label="Love">
                                <FavoriteIcon style={{fontSize:"30"}}/>
                            </IconButton>
                        </CardActions> */}
                    </Card>
        if (this.state.redirect){
            return <Redirect push to='/'/>;
        } else {
            return (
            <Fragment>
                        <Grid container alighItems='center'>
                            
                            <Paper style={{marginLeft: "auto", marginRight:"auto", padding: 30,height: "150vh", width: "70%"}} elevation="1">
                                <Paper style={{marginLeft: "auto", marginRight:"auto", padding: 20, width: "80%"}} elevation="0">
                                    <Typography variant='h2' style={{textAlign: 'center', fontFamily:"Arial Rounded MT Bold"}} justify="center" alignItems="center">
                                        Fill Your Infomation
                                    </Typography>
                                </Paper>
                                <Grid container direction='row' alighItems='center' style={{marginTop:20}} spacing={24}>
                                    
                                    <Grid sm item style={{marginLeft:0}}>
                                        {itemCard}
                                    </Grid>
                                    <Grid item sm>
                                        <Grid container direction='column' spacing={24} justify='space-around'>
                                            <Grid item>
                                                <TextField
                                                    id="outlined-adornment-productName"
                                                    variant="outlined"
                                                    label="Your Ditrict, City"
                                                    value={this.state.buyerCity}
                                                    onChange={this.handleChange('buyerCity')}
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"></InputAdornment>,
                                                    }}
                                                    />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    id="outlined-adornment-description"
                                                    variant="outlined"
                                                    label="Your Country"
                                                    value={this.state.buyerCountry}
                                                    onChange={this.handleChange('buyerCountry')}
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"></InputAdornment>,
                                                    }}
                                                    />
                                            </Grid>
                                            {/* <Grid item>
                                            <Select
                                                native
                                                value={this.state.buyerCity}
                                                onChange={this.handleChange('buyerCity')}
                                                input={
                                                    <OutlinedInput
                                                    name="Status"
                                                    fullWidth
                                                    id="outlined-status-native-simple"
                                                    />
                                                }
                                                >
                                                <option value="" />
                                                <option value={1}>Secondhand</option>
                                                <option value={0}>Brandnew</option>
                                                </Select>
                                            </Grid> */}
                                            <Grid item>
                                                <TextField
                                                    id="outlined-adornment-city"
                                                    variant="outlined"
                                                    label="Your Address"
                                                    value={this.state.buyerAddress1}
                                                    onChange={this.handleChange('buyerAddress1')}
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"></InputAdornment>,
                                                    }}
                                                    />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    id="outlined-adornment-city"
                                                    variant="outlined"
                                                    label="Your Phone"
                                                    value={this.state.buyerPhone}
                                                    onChange={this.handleChange('buyerPhone')}
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end"></InputAdornment>,
                                                    }}
                                                    />
                                            </Grid>
                                            
                                            
                                            
                                            <Grid item>
                                                
                                                <Grid container justify="space-between"alignItems="flex-end">
                                                    <TextField
                                                        id="outlined-adornment-price"
                                                        variant="outlined"
                                                        label="Desired Arrival Time"
                                                        value={this.state.arrivalTime}
                                                        onChange={this.handleChange("arrivalTime")}
                                                        // helperText="Product Name"
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">days</InputAdornment>,
                                                        }}
                                                        />
                                                    <Grid item>
                                                        <Button variant="outlined" color="primary" onClick={this.handleSubmit}/*style={{marginLeft:'65%', marginRight:'5%'}}*/ >
                                                            Buy
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            
                                        
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>                                
                            </Paper>
                        </Grid>
                    </Fragment>
        )
    }}
}
