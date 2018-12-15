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
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      productName: '',
      description: "",
      items: this.props.items,
      
      };
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleItem = this.handleItem.bind(this)
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
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
  handleItem(ev) {
    //this.props.handlePost(this.state.price)
    this.setState({productName:ev.target.productName,
                      description:ev.target.description,
                    value:ev.target.value})
  }
  handleAddItem(ev) {
    //this.props.handlePost(this.state.price)
    this.setState({productName:this.state.productName,
                      description:this.state.description,
                    value:this.state.value})
  }
  render() {
    return (
      <form>
      <div class="form-group">
          <label >Product Name</label>
          <input type="text" class="form-control" id="productName" value={this.state.productName} onChange={this.handleItem}/>
      </div>
      <div class="form-group">
          <label >Description</label>
          <input type="text" class="form-control" id="description" value={this.state.description} onChange={this.handleItem}/>
      </div>
      <div class="form-group">
          <label >Price</label>
          <input type="text" class="form-control" id="Price" value={this.state.price} onChange={this.handleItem}/>
      </div>
      <br/>   
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>
        <Link to='/' ><button type="submit" class="btn btn-outline-secondary btn-block" onClick={this.handleAddItem}>Upload</button></Link>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </form>
    )
  }
}