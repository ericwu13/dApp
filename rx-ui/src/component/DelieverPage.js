import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    
    
    render() {
        var deck_1 = [];
        for(let i=0; i<this.props.items.length; ++i){
            if(i<3){
                if(this.props.items[i].bought === true) {
                    let itemCard = 
                    <div class="card">
                        <Link to={'/shop/'+i}><img class="card-img-top maximage"  src={`https://www.dropbox.com/s/48xcbl9a1640k7w/${this.props.items[i].fileName}?dl=1`} /></Link>
                        <div class="card-body">
                            <h5 class="card-title">{this.props.items[i].productName}</h5>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Price: {this.props.items[i].price}</small>
                        </div>
                    </div>;
                    deck_1.push(itemCard);
                }
            }
        }

        var deck_2 = [];
        for(let i=3; i<this.props.items.length; ++i){
            if(i<6){
                if(this.props.items[i].bought === true) {
                    let itemCard = 
                    <div class="card">
                        <Link to={'/shop/'+this.props.items[i].productName}><img class="card-img-top maximage"  src={`https://www.dropbox.com/s/48xcbl9a1640k7w/${this.props.items[i].fileName}?dl=1`} /></Link>
                        <div class="card-body">
                            <h5 class="card-title">{this.props.items[i].productName}</h5>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Price: {this.props.items[i].price}</small>
                        </div>
                    </div>;
                    deck_2.push(itemCard);
                }
            }
        }
        

        return (
            <div>
                <div class='center'>
                    <div id="deck1" class="card-deck">
                        {deck_1}
                    </div>
                    <div id="deck1" class="card-deck">
                        {deck_2}
                    </div>
                </div>

            </div>
        );
    }
}

export default HomePage;