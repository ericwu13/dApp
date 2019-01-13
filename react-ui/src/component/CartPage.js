import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';
import iphonexs from './img/ixs.png';
import airpods from './img/airpods.png'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StoreIcon from '@material-ui/icons/Store';
import { AppBar, Typography, Grid, Tabs, Tab } from '@material-ui/core';
import CarList from './CartList'
import SellList from './SellList'
import DeliverList from './DeliverList'
import { CardStyles } from './Style'
import CartList from './CartList';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}
class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
                value: 0,
                deliverList: this.props.deliverList
        };
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        // this.forceUpdate();
        this.setState({deliverList: nextProps.deliverList});
        console.log(this.state.deliverList)
    }
    render() {
        const { value } = this.state;
        console.log(this.props.items)
        return <div>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            scrollButtons="auto"
                            styles={{flexGrow: 1,}}
                            > 
                            
                            <Tab label="Your Cart List" icon={<ShoppingBasketIcon/>}/>
                            <Tab label="Your Sell List" icon={<StoreIcon/>}/>
                            <Tab label="Your Delivery List" icon={<LocalShippingIcon/>}/>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer>
                        <CartList   items={this.props.items.reduce((itemList, item) => {
                                        if(item.buyerName !== this.props.dexonAccount) {
                                            return itemList
                                        } else {
                                            itemList.push(item)
                                            return itemList
                                        }
                                    }, [])}
                                handleGetName={this.props.handleGetName}
                                style={CardStyles} 
                                onClickItem={this.props.handleConfirmTx} 
                                type='buy'/>
                    </TabContainer>}
                    {value === 1 && <TabContainer>
                        <SellList   items={this.props.items.reduce((itemList, item) => {
                                        // console.log(item.sellerName)
                                        if(item.sellerName !== this.props.dexonAccount) {
                                            return itemList
                                        } else {
                                            itemList.push(item)
                                            return itemList
                                        }
                                    }, [])}
                                handleGetName={this.props.handleGetName}
                                style={CardStyles} 
                                onClickItem={this.props.handleConfirmDeliever} 
                                type='sell'/>
                    </TabContainer>}
                    {value === 2 && <TabContainer>
                        <Grid container>
                            <DeliverList   items={this.props.items.reduce((itemList, item) => {
                                            console.log(item.deliverName)
                                            if(item.deliverName === this.props.dexonAccount && item.status < 4) {
                                                itemList.push(item)
                                                return itemList
                                            } else {
                                                item.open = false
                                                return itemList
                                            }
                                        }, [])}
                                    deliverList={this.state.deliverList}
                                    style={CardStyles} 
                                    type='deliver'/>
                        </Grid>
                        
                    </TabContainer>}
                </div>
            
    }
}

export default CartPage