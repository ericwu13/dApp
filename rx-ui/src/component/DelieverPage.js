import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';
import iphonexs from './img/ixs.png';
import airpods from './img/airpods.png'
class DelieverPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit (ev){
        this.props.handleTakeMission(ev.target.value)
    }
    render() {
        var deck_1 = [];

        for(let i=0; i<this.props.items.length; ++i){
            if(i<3){
                var img;
                if(this.props.items[i].productName === "iphonexs") {
                    img = iphonexs
                }
                if(this.props.items[i].productName === "airpods") {
                    img = airpods
                }
                if(this.props.items[i].bought === true) {
                    let itemCard = 
                    <div class="card">
                        <img class="card-img-top maximage"  src={img} />
                        <div class="card-body">
                            <h5 class="card-title">{this.props.items[i].productName}</h5>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Price: {this.props.items[i].price}</small>
                        </div>
                        <Link to='/' ><button type="submit" class="btn btn-outline-secondary btn-block" name="index" value={this.props.items[i].index} onClick={this.handleSubmit}>Take Mission</button></Link>
                    </div>;
                    deck_1.push(itemCard);
                }
            }
        }
        

        return (
            <div>
                <div class='center'>
                    <div id="deck1" class="card-deck">
                        {deck_1}
                    </div>
                </div>

            </div>
        );
    }
}

export default DelieverPage