import React, { PureComponent } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class AccountPage extends PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          account:this.props.account,
          name:'',
          };
        this.handleName = this.handleName.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
    componentDidMount() {
        this.props.handleListProfile()

    }
    handleName(ev) {
        this.setState({ [ev.target.name]:ev.target.value })
      }
    handleSave(ev) {
      }

    render() {
        let user_info =
            <div class="">
                    <h3 class="card-title" id="user">Hi! {this.props.name}.</h3>
                    <h5 class="card-title">Balance: {this.props.balance} .</h5>
                    <h5 class="card-title">Cash Held: {this.props.held_balance} .</h5>
            </div>;  

        let pop_up =
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">You still don't have a name!</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <div class="form-group">
                <label >Name</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.handleName}/>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={this.handleSave}>Save</button>
            </div>
            </div>
        </div>
        </div>
            
        
        return (
            <div class="row">
                <div class="col col-lg-7 margin-left margin-top">
                    <ul class='list-group list-group-flush'>
                        {user_info}
                    </ul>
                    <button type="button" class="btn btn-outline-secondary btn-block" data-toggle="modal" data-target="#exampleModalCenter">Edit Name</button>
                    <ul class='list-group list-group-flush margin-top'>
                    </ul>
                    {pop_up}
                </div>
                <div class="col-lg-4">
                    <br/>
                    <br/>
                    <br/>
                    
                </div>
            </div>
        );
    }
}
export default AccountPage;