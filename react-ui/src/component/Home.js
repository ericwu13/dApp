import React, { Component, Fragment } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { CardStyles } from './Style'
import ItemList from './ItemList'
import { Link } from 'react-router-dom';
import './Style.css'

//slides
import slide1 from './img/1.png';
import slide2 from './img/2.png';
import slide3 from './img/3.jpg';
import iphonexs from './img/ixs.png';
import airpods from './img/airpods.png'

const styles = {
    Paper: {
        padding: 20,
        marginTop: 32,
        marginBottom: 20,
        marginLeft: 80,
        marginRight: 40,
        height: 1000,
        overflow: 'auto'
    },
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        // this.forceUpdate();
        this.setState({items: nextProps.items});
    }
    
    render() {
        // console.log("Home render")
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
                    <ItemList   items={this.state.items.reduce((itemList, item) => {
                                        // console.log("Home iteming")
                                        if(item.status !== 0) {
                                            return itemList
                                        } else {
                                            itemList.push(item)
                                            return itemList
                                        }
                                    }, [])}
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