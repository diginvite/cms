import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab, Dimmer, Loader, Image, Segment  } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';

import Table from '../../components/packages/Table';
import CreateForm from '../../components/packages/CreateForm';
import Loading from '../../components/Loading';

import { storePackage, getPackages, taggleActivePackage, destroyPackage} from '../../actions/package-action';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      nameError: false,
      description: '',
      data: [],
      alert: null,
      isLoading: true,
    }
  }

  componentDidMount(){
    this.props.getPackages().then(() => {
      this.setState({isLoading: false})
    })
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value 
    }, () => {
      if (this.state.name === '') {
        this.setState({nameError: true})
      }else{
        this.setState({nameError: false})
      }
    })
  }

  onSubmit(e){
    e.preventDefault();
    if (this.state.name == '') {
      this.setState({nameError: true})
    }else{
      const data = {
        name: this.state.name,
        description: this.state.description
      }
      this.props.storePackage(data).then(() => {
        this.setState({name: '', description: ''});
        toast.success("Data saved !", {
          position: toast.POSITION.TOP_RIGHT
        });
      });
    }
  }

  onConfirm(i, data, flag){
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText={
            flag == 'toggleActive' ?
            "Yes change it" :
            flag == 'destroy' ?
            "Yes delete it" : null
          }
        confirmBtnBsStyle={
            flag == 'toggleActive' ?
            "primary" :
            flag == 'destroy' ?
            "danger" : null
          }
        cancelBtnBsStyle="default"
        title="Are you sure?"
       onConfirm={
            flag == 'toggleActive' ?
            () => this.onToggleActive(i, data): 
            flag == 'destroy' ?
            () => this.onDestroy(i, data):
            null
         }
        onCancel={() => this.onHideAlert()}
      >
      {
          flag == 'toggleActive' ?
          "Change stat for this data!" :
          flag == 'destroy' ?
          "You will not be able to recover this imaginary file!" : null
      }
      </SweetAlert>
    );

    this.setState({
        alert: getAlert()
    });
  }

  onHideAlert(){
    this.setState({alert: null})
  }

  onToggleActive(i, data){
    this.props.taggleActivePackage(i, data).then(() => {
      this.onHideAlert()
      toast.success("Data updated !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  onDestroy(i, data){
    this.props.destroyPackage(i, data).then(() => {
      this.onHideAlert()
      toast.success("Data deleted !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  render() {
      const panes = [
        {
          menuItem: { key: 'list', icon: 'list', content: 'List' },
          render: () => <Tab.Pane>
            <Table
              data={this.props.packages}
              onConfirm={(i, data, flag) => this.onConfirm(i, data, flag)}
            />
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'form', icon: 'edit', content: 'Form' },
          render: () => <Tab.Pane loading={false}>
            <CreateForm
              name={this.state.name}
              nameError={this.state.nameError}
              description={this.state.description}
              onChange={(e) => this.onChange(e)}
              onSubmit={(e) => this.onSubmit(e)}
            />
          </Tab.Pane>,
        },
      ];
      if (this.state.isLoading) {
        return(
          <Loading/>
        )
      }
      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Dashboard
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li className=""><Link to="/dashboard">Dashboard</Link></li>
              <li className="active">Package</li>
            </ol>
          </section>
          <section className="content">
            <div className="box box-border-radius">
              <div className="box-header with-border">
                <h3 className="box-title">Package</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-12">
                    <Tab renderActiveOnly={true}  panes={panes} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {this.state.alert}
          <ToastContainer />
        </React.Fragment>
      );
  }
}

function mapStateToProps(state){
  return {
    packages: state.package.packages,
  };
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getPackages: getPackages,
    storePackage: storePackage,
    taggleActivePackage: taggleActivePackage,
    destroyPackage: destroyPackage,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Index));
