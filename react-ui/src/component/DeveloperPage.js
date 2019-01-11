import React, { Component } from 'react';

class DeveloperPage extends Component {
    constructor(props) {
        super(props);

        this.handleForm = this.handleForm.bind(this)
        this.handleContract = this.handleContract.bind(this)
        this.handleSponsor = this.handleSponsor.bind(this)
        this.state = {
          account : this.props.account,
          contractAddress : "",
          sponsorValue: 0
        };
    }
    componentDidMount() {
        //this.props.handleListProfile();
    }
    handleForm(ev) {
        console.log(ev.target.name)
        console.log(ev.target.value)
        this.setState({ [ev.target.name]:ev.target.value })
    }
    handleContract() {
        this.props.updateContract(this.state.contractAddress);
    }
    handleSponsor() {
        this.props.sponsor(this.state.sponsorValue)
    }

    render() {
        return (
            <div>
                <br/>
                <div className='col-4'>
                    <div class="form-group">
                        <label >Current Contract Address: {this.props.currentAddress}</label>
                        <input type="text" class="form-control" id="contractAddress" name="contractAddress" value={this.state.contractAddress} onChange={this.handleForm}/>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleContract}>Update</button>
                    </div>
                    <div class="form-group">
                        <label >Sponsor Value</label>
                        <input type="text" class="form-control" id="sponsorValue" name="sponsorValue" value={this.state.sponsorValue} onChange={this.handleForm}/>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleSponsor}>Sponsor</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default DeveloperPage;