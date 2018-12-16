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
                    <div class="card">
                        <img class="card-img-top"  src={img} ></img>
                        <div class="card-body">
                            <h5 class="card-title">{item.productName}</h5>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Price: {item.price}</small>
                        </div>
                    </div>;
        return (
            <div class='left'>
                <div id="deck1" class="card-deck">
                    {itemCard}
                </div>
                <Link to='/' ><button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleSubmit}>BUY</button></Link>
            </div>
        )
    }
}
