import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Input, Form, Button, Icon} from 'semantic-ui-react';
import ReactCloudinaryUploader from '@app-masters/react-cloudinary-uploader';
import { ToastContainer, toast } from 'react-toastify';

import {storeFile} from '../../actions/order-action';

class Music extends Component {
  constructor(props){
    super(props)
    this.state = {
      music: ''
    }
  }

  componentDidMount(){
    if (this.props.order.music !== null) {
      this.setState({music: this.props.order.music.path})
    }
  }

  onUpload(){
    let options = {
    cloud_name: "ajatdarojat45",
    upload_preset: "diginvite",
    };
  
    ReactCloudinaryUploader.open(options).then(image=>{
    if (this.props.returnJustUrl)
      image = image.url;   
      this.setState({music: image.url}, () => {
        this.onSubmit()
      });
    }).catch(err=>{
      console.error(err);
    });
  }

  onSubmit(){
    const data = {
      orderId: this.props.order.id,
      path: this.state.music,
      description: '',
      type: 'music',
    }
    this.props.storeFile(data).then(() => {
      toast.success("Data saved !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  render(){
    return(
      <>
        <Form>
          <Form.Input type='text' placeholder='Search...' action>
            <input value={this.state.music} readOnly/>
            <Button type='submit' color='blue' onClick={() => this.onUpload()}><Icon name="cloud upload"/> Upload</Button>
          </Form.Input>
          {
            this.state.music !== '' ?
              <audio src={this.state.music} controls></audio>
            : null
          }
        </Form>
        <ToastContainer/>
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    order: state.order.order,
  };
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    storeFile: storeFile
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Music));