import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import {Button, Icon} from 'semantic-ui-react';
import ReactCloudinaryUploader from '@app-masters/react-cloudinary-uploader';
import { ToastContainer, toast } from 'react-toastify';

import {storeFile, destroyFile, updateFile} from '../../actions/order-action';

import ImageForm from '../../components/images/Form';
import ImageList from '../../components/images/List';
import ModalConfirm from '../../components/modals/Confirm';

class Gallery extends Component{
  constructor(props){
    super(props);
    this.state = {
      index: null,
      id: '',
      form: false,
      formEdit: false,
      image: '',
      imageError: false,
      description: '',
      images: [],
      alert: null,
    }
  }

  componentDidMount(){
    this.setState({images: this.props.order.galleries})
  }

  onChange(e, {name, value}){
    this.setState({[name]: value}, () => {
      
    })
  }

  onUpload(){
    let options = {
    cloud_name: "ajatdarojat45",
    upload_preset: "diginvite",
    // multiple: true,
    // returnJustUrl: true
    };
  
    ReactCloudinaryUploader.open(options).then(image=>{
    if (this.props.returnJustUrl)
      image = image.url;   
      this.setState({image: image.url, imageError: false});
    }).catch(err=>{
      console.error(err);
    });
  }

  onSubmit(e){
    e.preventDefault();
    if (this.state.image === '') {
      this.setState({imageError: true})
    }else{
      const data = {
        orderId: this.props.order.id,
        path: this.state.image,
        description: this.state.description,
        type: 'gallery',
      }
      this.props.storeFile(data).then(() => {
        this.setState({
          image: '',
          description: '',
          images: this.props.order.galleries
        });
        toast.success("Data saved !", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }
  }

  onAction(i, data, flag){
    if (flag === 'edit') {
      this.onEdit(i, data);
    }

    let getContent;
    if (flag === 'destroy') {
      getContent = () => (
        <ModalConfirm
          index={i}
          data={data}
          header="Delete Data"
          content="Are you sure to delete this data?"
          onHide={() => {this.setState({alert: null})}}
          onAction={() => this.onDelete()}
        />
      );
      this.setState({alert: getContent()});
    }
  }

  onEdit(i, data){
    this.setState({
      index: i,
      id: data.id,
      image: data.path,
      description: data.description,
      formEdit: true,
    })
  }

  onHide(){
    this.setState({
      index: null,
      id: '',
      image: '',
      description: '',
      formEdit: false,
    })
  }

  onDelete(){
    const data = {
      id: this.state.id
    }
    this.props.destroyFile(data).then(() => {
      const images = this.state.images.filter(function(image) {
        return image.id !== data.id
      });
      toast.success("Data deleted !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({images: images, alert: null, formEdit: false})
    })
  }

  onUpdate(e){
    e.preventDefault();
    if (this.state.image === '') {
      this.setState({imageError: true})
    }else{
      const data = {
        id: this.state.id,
        path: this.state.image,
        description: this.state.description,
      }
      this.props.updateFile(data).then(() => {
        let images = this.state.images;
        images[this.state.index] = data;
        this.setState({images: images});
        toast.success("Data saved !", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }
  }

  render(){
    return(
      <>
        <Button type='submit' primary size="small" onClick={() => this.setState({form: true})}><Icon name="plus circle" /> Add</Button>
        <ImageForm
          title="Image Form"
          open={this.state.form}
          image={this.state.image}
          imageError={this.state.imageError}
          description={this.state.description}
          onChange={(e, meta) => this.onChange(e, meta)}
          onUpload={() => this.onUpload()}
          onHide={() => this.setState({form: false})}
          onSubmit={(e) => this.onSubmit(e)}
        />
        <ImageForm
          title="Image Form Edit"
          open={this.state.formEdit}
          image={this.state.image}
          imageError={this.state.imageError}
          description={this.state.description}
          delete={true}
          onChange={(e, meta) => this.onChange(e, meta)}
          onUpload={() => this.onUpload()}
          onHide={() => this.onHide()}
          onSubmit={(e) => this.onUpdate(e)}
          onAction={(i, data, flag) => this.onAction(i, data, flag)}
        />
        <br/>
        <br/>
        <ImageList
          data={this.state.images}
          onAction={(i, data, flag) => this.onAction(i, data, flag)}
        />
        <ToastContainer/>
        {this.state.alert}
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    order: state.order.order
  };
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    storeFile: storeFile,
    destroyFile: destroyFile,
    updateFile: updateFile
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Gallery));