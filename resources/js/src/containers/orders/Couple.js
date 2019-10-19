import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import ReactCloudinaryUploader from '@app-masters/react-cloudinary-uploader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalConfirm from '../../components/Modals/Confirm';
import CoupleList from '../../components/couples/List';
import CoupleForm from '../../components/couples/Form';
import CoupleShow from '../../components/couples/ModalShow';
import CoupleEdit from '../../components/couples/Edit';

import {storeCouple, destroyCouple, updateCouple} from '../../actions/order-action';

class Couple extends Component{
  constructor(props){
    super(props);
    this.state = {
      index: '',
      id: '',
      image: '',
      imageError: false,
      firstDegree: '',
      name: '',
      nameError: false,
      lastDegree: '',
      father:'',
      fatherError: false,
      mother: '',
      motherError: false,
      childOf: '',
      childOfError: false,
      description: '',
      couples: [],
      alert: null,
      show: false,
      edit: false,
    };
  }

  componentDidMount(){
    this.setState({couples: this.props.order.couples});
  }

  onChange(e, { value, name }){
    this.setState({
      [name]: value
    }, () => {
      if (name == 'name') {
        if (this.state.name == '') {
          this.setState({nameError: true})
        }else{
          this.setState({nameError: false})
        }
      }
      if (name == 'father') {   
        if (this.state.father == '') {
          this.setState({fatherError: true})
        }else{
          this.setState({fatherError: false})
        }
      }
      if (name == 'mother') {
        if (this.state.mother == '') {
          this.setState({motherError: true})
        }else{
          this.setState({motherError: false})
        }
      }
      if (name == 'childOf') {        
        if (this.state.childOf == '') {
          this.setState({childOfError: true})
        }else{
          this.setState({childOfError: false})
        }
      }
    })
  }

  onUpload(){
    // if (this.state.couples.length >= 2) {
    //   return
    // }
    let options = {
    cloud_name: "ajatdarojat45",
    upload_preset: "diginvite",
    // multiple: true,
    // returnJustUrl: true
    };
  
    ReactCloudinaryUploader.open(options).then(image=>{
    if (this.props.returnJustUrl)
      image = image.url;   
      // console.log(image.url);
      this.setState({image: image.url, imageError: false});
    }).catch(err=>{
      console.error(err);
    });
  }

  onSubmit(e){
    if (this.state.image === '') {
      this.setState({imageError: true})
    }else{
      if (this.state.name === '') {
        this.setState({nameError: true});
      }else{
        if (this.state.father === '') {
          this.setState({fatherError: true})
        }else{
          if (this.state.mother === '') {
            this.setState({motherError: true})
          }else{
            if (this.state.childOf === '' || this.state.childOf <= 0) {
              this.setState({childOfError: true})
            }else{
              const data = {
                orderId: this.props.order.id,
                image: this.state.image,
                firstDegree: this.state.firstDegree,
                name: this.state.name,
                lastDegree: this.state.lastDegree,
                father: this.state.father,
                mother: this.state.mother,
                childOf: this.state.childOf,
                description: this.state.description,
              }
              this.props.storeCouple(data).then(() => {
                toast.success("Data saved !", {
                  position: toast.POSITION.TOP_RIGHT
                });
                this.setState({
                  image: '',
                  firstDegree: '',
                  name: '',
                  lastDegree: '',
                  father: '',
                  mother: '',
                  childOf: '',
                  description: '',
                  couples: this.props.order.couples,
                })
              })
            }
          }
        }
      }
    }
  }

  onAction(i, data, flag){
    let getContent;
    if (flag === 'destroy') {
      getContent = () => (
        <ModalConfirm
          index={i}
          data={data}
          header="Delete Data"
          content="Are you sure to delete this data?"
          onHide={() => {this.setState({alert: null})}}
          onAction={(data, index) => this.onDestroy(data, index)}
        />
      );
      this.setState({alert: getContent()});
    }

    if(flag === 'show'){
      getContent = () => (
        <CoupleShow
          data={data}
          open={this.state.show}
          onHide={() => this.setState({show: null})}
        />
      );
      this.setState({show: getContent()});
    }

    if(flag === 'edit'){
      this.onEdit(i, data);
    }
  }

  onEdit(i, data){
    this.setState({
      index: i,
      id: data.id,
      image: data.image,
      firstDegree: data.firstDegree,
      name: data.name,
      lastDegree: data.lastDegree,
      father: data.father,
      mother: data.mother,
      childOf: data.child,
      description: data.description,
      edit: true,
    });
  }

  onHide(){
    this.setState({
      image: '',
      firstDegree: '',
      name: '',
      lastDegree: '',
      father: '',
      mother: '',
      childOf: '',
      description: '',
      edit: false,
    })
  }

  onDestroy(data){
    this.props.destroyCouple(data).then(() => {
      const couples = this.state.couples.filter(function(couple) {
        return couple.id !== data.id
      });
      toast.success("Data deleted !", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({couples: couples, alert: null})
    })
  }

  onUpdate(){
    if (this.state.image === '') {
      this.setState({imageError: true})
    }else{
      if (this.state.name === '') {
        this.setState({nameError: true});
      }else{
        if (this.state.father === '') {
          this.setState({fatherError: true})
        }else{
          if (this.state.mother === '') {
            this.setState({motherError: true})
          }else{
            if (this.state.childOf === '' || this.state.childOf <= 0) {
              this.setState({childOfError: true})
            }else{
              const data = {
                id: this.state.id,
                image: this.state.image,
                firstDegree: this.state.firstDegree,
                name: this.state.name,
                lastDegree: this.state.lastDegree,
                father: this.state.father,
                mother: this.state.mother,
                child: this.state.childOf,
                description: this.state.description,
              }
              this.props.updateCouple(data).then(() => {
                let couples = this.state.couples;
                couples[this.state.index] = data;
                this.setState({couples: couples});
                toast.success("Data updated !", {
                  position: toast.POSITION.TOP_RIGHT
                });
              })
            }
          }
        }
      }
    }
  }

  render(){
    const panes = [
      { menuItem: 'Couple', render: () => 
        <Tab.Pane>
          <CoupleList
            data={this.state.couples}
            onAction={(i, data, flag) => this.onAction(i, data, flag)}
          />
        </Tab.Pane> 
      },
      { 
        menuItem: 'Form', render: () => 
        <Tab.Pane disabled={this.state.couples.length >= 2 ? true : false}>
          <CoupleForm
            image={this.state.image}
            imageError={this.state.imageError}
            firstDegree={this.state.firstDegree}
            name={this.state.name}
            nameError={this.state.nameError}
            lastDegree={this.state.lastDegree}
            father={this.state.father}
            fatherError={this.state.fatherError}
            mother={this.state.mother}
            motherError={this.state.motherError}
            childOfError={this.state.childOf}
            childOfError={this.state.childOfError}
            description={this.state.description}
            onChange={(e, meta) => this.onChange(e, meta)}
            onSubmit={(e) => this.onSubmit(e)}
            onUpload={() => this.onUpload()}
          />
        </Tab.Pane> 
      },
    ]

    return(
      <React.Fragment>
        <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
        <ToastContainer />
        {this.state.alert}
        {this.state.show}
        <CoupleEdit
          open={this.state.edit}
          image={this.state.image}
          imageError={this.state.imageError}
          firstDegree={this.state.firstDegree}
          name={this.state.name}
          nameError={this.state.nameError}
          lastDegree={this.state.lastDegree}
          father={this.state.father}
          fatherError={this.state.fatherError}
          mother={this.state.mother}
          motherError={this.state.motherError}
          childOf={this.state.childOf}
          childOfError={this.state.childOfError}
          description={this.state.description}
          onChange={(e, meta) => this.onChange(e, meta)}
          onSubmit={(e) => this.onUpdate(e)}
          onUpload={() => this.onUpload()}
          onHide={() => this.onHide()}
        />
      </React.Fragment>
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
    storeCouple: storeCouple,
    destroyCouple: destroyCouple,
    updateCouple: updateCouple,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Couple));