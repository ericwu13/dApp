import React, { Component } from 'react'
import { Grid, Card, Typography, CardActions, CardContent, CardMedia, CardHeader, Button, Fab} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Link } from 'react-router-dom';

import ix from './img/ixs.png'
import airpods from './img/airpods.png'

export default class extends Component {
    handleSubmit = index => {
        console.log("BUY")
        console.log(index)
        this.props.onClickItem(index)
    }
    render () {
        const { items , style, type } = this.props
        let bought, delivered, clickIcon, container
        if( type === 'homePage') {
            bought = false
            delivered = false
            clickIcon = <ShoppingCartIcon/>
            container = style.homeContainer
        } else if (type === 'deliverPage') {
            bought = true
            delivered = false
            clickIcon = <LocalShippingIcon/>
            container = style.deliverContainer
        }
        let deck_1 = []
        for(let i = 0; i < items.length; ++i) {
            let item = items[i]
            let index = i
            if(item.bought === bought && item.delivered === delivered) {
                let itemCard = 
                    <Grid item>
                        <Card style={style.card}>
                            {/* <CardActionArea>  */}
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" style={style.avatar}>
                                        E
                                        </Avatar>
                                    }
                                    title="Taipei, Taiwan"
                                    subheader="January 01, 2019"
                                    />
                                <CardMedia
                                    image={(item.productName === 'iphonexs')? ix : airpods}
                                    style={style.media}
                                    />
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {item.productName}
                                    </Typography>
                                    <Typography gutterBottom variant="h6">
                                        ${item.price}
                                    </Typography>
                                </CardContent>
                            {/* </CardActionArea> */}
                            <CardActions style={style.actions} disableActionSpacing>
                                <IconButton onClick={() => {this.handleSubmit(index)}}>
                                    {clickIcon}
                                </IconButton>
                                <IconButton aria-label="Love">
                                    <FavoriteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                deck_1.push(itemCard);
            }
        }
        return  <Grid container direction="row" spacing="24" alignItems="flex-start" style={container}>
                    {deck_1}
               </Grid>
                
                       
        

    }
}
