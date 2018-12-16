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
      fileName: '',
      uploadedFileCloudinaryUrl: '',
      productName: '',
      description: "",
      price      : 0
      };
    this.handleItem = this.handleItem.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

  onImageDrop(files) {
    this.setState({
      fileName: files[0].name
    });

    //this.handleImageUpload(files[0]);
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
  handleItem(ev) {
    this.setState({ [ev.target.name]:ev.target.value })
  }
  handleSubmit(ev) {
    //ev.preventDefault();
    this.props.handleItemAppend(this.state.productName, this.state.description, this.state.price, this.state.fileName)
    //console.log(this.state.productName)
  }
  render() {
    return (
      <div className='row'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <br/>
      <form>
      <div class="form-group">
          <label >Product Name</label>
          <input type="text" class="form-control" id="productName" name="productName" value={this.state.productName} onChange={this.handleItem}/>
      </div>
      <div class="form-group">
          <label >Description</label>
          <input type="text" class="form-control" id="description" name="description" value={this.state.description} onChange={this.handleItem}/>
      </div>
      <div class="form-group">
          <label >Price</label>
          <input type="text" class="form-control" id="price" name="price" value={this.state.price} onChange={this.handleItem}/>
      </div>
      <br/>   
        <div className="FileUpload center dropzone">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>
        <br/>   
        <Link to='/' ><button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleSubmit}>Upload</button></Link>

        <div>
        <br/>   
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
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