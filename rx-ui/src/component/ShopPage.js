import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import request from 'superagent';
import './Style.css';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(ev) {
        this.props.handleBuy(this.props.id)
    }
    render() {
        const id = this.props.id
        let itemCard = 
                    <div class="card">
                        <img class="card-img-top"  src={`https://www.dropbox.com/s/48xcbl9a1640k7w/${this.props.items[id].fileName}?dl=1`} ></img>
                        <div class="card-body">
                            <h5 class="card-title">{this.props.items[id].productName}</h5>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Price: {this.props.items[id].price}</small>
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
