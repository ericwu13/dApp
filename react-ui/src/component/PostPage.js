import React from 'react';
import Dropzone from 'react-dropzone';
import { Link, Redirect } from 'react-router-dom';
import request from 'superagent';
import './Style.css';

const CLOUDINARY_UPLOAD_PRESET = 'bmzjbxoq';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login:this.props.login,
            fileName: '',
            uploadedFileCloudinaryUrl: '',
            productName: '',
            description: "",
            price      : 0
        };
        this.handleForm = this.handleForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onImageDrop(files) {
        this.setState({
            fileName: files[0].name
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }
    handleForm(ev) {
        this.setState({ [ev.target.name]:ev.target.value })
    }
    handleSubmit(ev) {
        this.props.handlePost(this.state.productName, this.state.description, this.state.price)
        //console.log(this.state.productName)
    }
    render() {
        if(this.props.login===false){
        return <Redirect push to = '/login'/>;
        }
        return (
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <br/>
                    <form>
                        <div class="form-group">
                            <label >Product Name</label>
                            <input type="text" class="form-control" id="productName" name="productName" value={this.state.productName} onChange={this.handleForm}/>
                        </div>
                        <div class="form-group">
                            <label >Description</label>
                            <input type="text" class="form-control" id="description" name="description" value={this.state.description} onChange={this.handleForm}/>
                        </div>
                        <div class="form-group">
                            <label >Price</label>
                            <input type="text" class="form-control" id="price" name="price" value={this.state.price} onChange={this.handleForm}/>
                        </div>
                        <br/>   
                        <div className="FileUpload dropzone">
                            <Dropzone
                                onDrop={this.onImageDrop.bind(this)}
                                multiple={false}
                                accept="image/*">
                                <div>Drop an image or click to select a file to upload.</div>
                            </Dropzone>
                            <br/>   
                        </div>
                        <Link to='/' ><button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleSubmit}>SELL</button></Link>
    
                        <div>
                            <br/>   
                            {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <div>
                                <p>{this.state.fileName}</p>
                                <img src={this.state.uploadedFileCloudinaryUrl} />
                            </div>
                            }
                        </div>
                    </form>
                    <br/>   
                    <br/>   
                </div>
                <div className='col-4'></div>
            </div>
        )
    }
}