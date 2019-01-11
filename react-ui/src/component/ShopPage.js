import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import request from 'superagent';
import './Style.css';
import iphonexs from './img/ixs.png';
import airpods from './img/airpods.png'
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(ev) {
        this.props.handleBuy(this.props.id)
    }
    render() {
        var item;
        for(let i=0; i<this.props.items.length; ++i){
            if(this.props.items[i].index === this.props.id) {
                item = this.props.items[i]
            }
            
        }
        var img;
        if(item.productName === "iphonexs") {
            img = iphonexs
        }
        if(item.productName === "airpods") {
            img = airpods
        }
        let itemCard = 
                    <div class='center'>
                        <label>
                            <img class="card-img-top maximage"  src={img} ></img>
                            <div class="card-body">
                                <h5 class="card-title App">{item.productName}</h5>
                                <h5 class="card-title App">Item ID: {this.props.id}</h5>
                            </div>
                            <div class="card-footer App">
                                <div class="text-muted App">Price: {item.price}</div>
                            </div>
                            <Link to='/' ><button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleSubmit}>BUY</button></Link>
                        </label>
                    </div>;
        return (
            <div class='left'>
                <div id="deck1" class="card-deck">
                    {itemCard}
                </div>
                <div class="center ">
                </div>
            </div>
        )
    }
}
