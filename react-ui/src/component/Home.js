import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { CardStyles } from './Style'
import ItemList from './ItemList'
import './Style.css'

//slides
import slide1 from './img/1.png';
import slide2 from './img/2.png';
import slide3 from './img/3.jpg';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItems: []
        }
    }
    componentDidMount () {
        console.log("Home Mounted")
        console.log(this.props.items)
        const promises = this.props.items.reduce((itemList, item) => {
            if(item.status === 0) {
                var promise =  new Promise((resolve, reject) => {this.props.getReputation(item.sellerName)
                        .then((response) => {
                            resolve({...item, sellerReputation: response[0], deliveryReputation: response[1]})
                        })
                    })
                itemList.push(promise)
                return itemList
            } else {
                return itemList
            }
        }, [])
        Promise.all(promises)
        .then((newItems) => {
            this.setState({newItems: newItems})
            console.log("home Reputation Get")
            console.log(this.state.newItems)
            this.forceUpdate()
        })
        
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.items !== nextProps.items;
    }
    
    // componentWillReceiveProps(nextProps){
    //     console.log("Home Will Receive")
    //     if(nextProps) {
    //         const promises = nextProps.items.reduce((itemList, item) => {
    //             if(item.status === 0) {
    //                 var promise = new Promise((resolve, reject) => {
    //                     if(item.status === 0){
    //                         this.props.getReputation(item.sellerName)
    //                         .then((response) => {
    //                             resolve({...item, sellerReputation: response[0], deliveryReputation: response[1]})
    //                         })
    //                     }                
    //                 })
    //                 itemList.push(promise)
    //             }
    //             return itemList
    //         })
    //         Promise.all(promises)
    //         .then((newItems) => {
    //             this.setState({newItems: newItems})
    //             console.log("home will receive Reputation Get")
    //             console.log(this.state.newItems)
    //         })
    //         this.forceUpdate()
    //     }
    // }
    
    render() {
        console.log("Home render")
        console.log(this.props.items)
        return (
            <Fragment>
                <div id="slideControls" class="carousel slide " data-ride="carousel">
                    <div class="carousel-inner center">
                        <div class="carousel-item active">
                            <img src={slide1} class="img-responsive center banner" alt="Responsive image"/>
                        </div>
                        <div class="carousel-item">
                            <img src={slide2} class="img-responsive center" alt="Responsive image"/>
                        </div>
                        <div class="carousel-item">
                            <img src={slide3} class="img-responsive center" alt="Responsive image"/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#slideControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#slideControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <Grid container>
                    <ItemList   items={this.state.newItems}
                                handleGetName={this.props.handleGetName}
                                style={CardStyles} 
                                onClickItem={this.props.handleBuy} 
                                type='homePage'/>
                </Grid>
            </Fragment>
        );
        
    }
}

export default HomePage;