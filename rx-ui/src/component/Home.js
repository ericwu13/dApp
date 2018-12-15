import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

//slides
import slide1 from '../img/slide1.png';
import slide2 from '../img/slide1.png';
import slide3 from '../img/slide1.png';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            productName:this.props.productName
        };
    }
    
    
    render() {
        console.log(this.props.productName)
        var deck_1 = [];
        for(let i=0; i<this.state.items.length; ++i){
            if(i<3){
                let itemCard = 
                <div class="card">
                    <Link to={'/shop/'+this.state.items[i][0]}><img class="card-img-top"  src={this.state.items[i].img}/></Link>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.items[i][0]}</h5>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Price: {this.state.items[i][2]}</small>
                    </div>
                
                </div>;
                deck_1.push(itemCard);}}

        var deck_2 = [];
        for(let i=3; i<this.state.items.length; ++i){
            if(i<6){
                let itemCard = 
                <div class="card">
                    <Link to={'/shop/'+this.state.items[i][0]}><img class="card-img-top"  src={this.state.items[i]}/></Link>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.items[i][0]}</h5>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Price: {this.state.items[i][1]}</small>
                    </div>
                
                </div>;
                deck_2.push(itemCard);}}
        

        return (
            <div>
                <div id="slideControls" class="carousel slide container" data-ride="carousel">
                    <div class="carousel-inner center">
                        <div class="carousel-item active">
                            <img src={slide1} class="img-responsive center" alt="Responsive image"/>
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