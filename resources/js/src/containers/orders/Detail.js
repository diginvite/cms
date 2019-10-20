import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab, Dimmer, Loader, Image, Segment  } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';

import Table from '../../components/orders/Table';
import CreateForm from '../../components/orders/Form';
import Loading from '../../components/Loading';
import ModalConfirm from '../../components/modals/Confirm';
import Couple from './Couple';
import Event from './Event';
import Cover from './Cover';
import Gallery from './Gallery';
import Music from './Music';
import Invitation from './Invitation';
import Guest from './Guest';

import { storeOrder, getOrders, toggleActiveOrder, destroyOrder, getOrder } from '../../actions/order-action';
import { getActivePackages } from '../../actions/package-action';

class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      nameError: false,
      domain: this.props.match.params.slug,
      domainError: false,
      email: '',
      emailError: false,
      phone: '',
      phoneError: false,
      company: '',
      address: '',
      description: '',
      packageId: '',
      packageIdError: false,
      data: [],
      alert: null,
      isLoading: true,
    }
  }

  componentDidMount(){
    this.props.getOrder(this.state.domain).then(() => {
      this.setState({
        isLoading: false,
        name: this.props.order.name,
        email: this.props.order.email,
        phone: this.props.order.phone,
        company: this.props.order.company,
        address: this.props.order.address,
        description: this.props.order.description,
        packageId: this.props.order.package.id,
      })
    })
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
      if (name == 'domain') {   
        if (this.state.domain == '') {
          this.setState({domainError: true})
        }else{
          this.setState({domainError: false})
        }
      }
      if (name == 'email') {
        if (this.state.email == '') {
          this.setState({emailError: true})
        }else{
          this.setState({emailError: false})
        }
      }
      if (name == 'phone') {
        if (this.state.phone == '') {
          this.setState({phoneError: true})
        }else{
          this.setState({phoneError: false})
        }
      }
      if (name == 'packageId') {
        if (this.state.packageId == '') {
          this.setState({packageIdError: true})
        }else{
          this.setState({packageIdError: false})
        }
      }
    })
  }

  onSubmit(e){
    e.preventDefault();
    if (this.state.name === '') {
      this.setState({nameError: true});
    }else{
      if (this.state.domain === '') {
        this.setState({domainError: true});
      }else{
        if (this.state.email === '') {
          this.setState({emailError: true});
        }else{
          if (this.state.phone === '') {
            this.setState({phoneError: true});
          }else{
            if (this.state.packageId === '') {
              this.setState({packageIdError: true});
            }else{
              const data = {
                name: this.state.name,
                domain: this.state.domain,
                email: this.state.email,
                phone: this.state.phone,
                company: this.state.company,
                address: this.state.address,
                description: this.state.description,
                packageId: this.state.packageId,
              }
              this.props.storeOrder(data).then(() => {
                this.setState({
                  name: '', 
                  domain: '',
                  email: '',
                  phone: '',
                  address: '',
                  description: ''
                });
                toast.success("Data saved !", {
                  position: toast.POSITION.TOP_RIGHT
                });
              });
            }
          }
        }
      }
    }
  }

  onConfirm(i, data, flag){
    let getAlert;
    if (flag === 'destroy') {
      getAlert = () => (
        <ModalConfirm
          index={i}
          data={data}
          header="Delete Data"
          content="Are you sure to delete this data?"
          onHide={() => {this.setState({alert: null})}}
          onAction={(data, index) => this.onDestroy(data, index)}
        />
      );
    }

    if (flag === 'toggleActive') {
      getAlert = () => (
        <ModalConfirm
          index={i}
          data={data}
          header="Toggle Active"
          content="Are you sure to doing this action?"
          onHide={() => {this.setState({alert: null})}}
          onAction={(data, index) => this.onToggleActive(data, index)}
        />
      );
    }

    this.setState({
        alert: getAlert()
    });
  }

  onHideAlert(){
    this.setState({alert: null})
  }

  onToggleActive(data, i){
    this.props.toggleActiveOrder(i, data).then(() => {
      this.onHideAlert()
      toast.success("Data updated !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  onDestroy(data, i){
    this.props.destroyOrder(i, data).then(() => {
      this.onHideAlert()
      toast.success("Data deleted !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  render() {
      const panes = [
        {
          menuItem: { key: 'edit', icon: 'edit', content: 'Edit' },
          render: () => <Tab.Pane loading={false}>
            <CreateForm
              name={this.state.name}
              nameError={this.state.nameError}
              domain={this.state.domain}
              domainError={this.state.domainError}
              email={this.state.email}
              emailError={this.state.emailError}
              phone={this.state.phone}
              phoneError={this.state.phoneError}
              company={this.state.company}
              address={this.state.address}
              description={this.state.description}
              packageId={this.state.packageId}
              packageIdError={this.state.packageIdError}
              packages={this.props.packages}
              onChange={(e, meta) => this.onChange(e, meta)}
              onSubmit={(e) => this.onSubmit(e)}
            />
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'couple', icon: 'user', content: 'Couple' },
          render: () => <Tab.Pane loading={false}>
            <Couple/>
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'event', icon: 'building', content: 'Event' },
          render: () => <Tab.Pane loading={false}>
            <Event/>
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'cover', icon: 'images', content: 'Cover' },
          render: () => <Tab.Pane loading={false}>
            <Cover/>
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'image', icon: 'images', content: 'Gallery' },
          render: () => <Tab.Pane loading={false}>
            <Gallery/>
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'music', icon: 'music', content: 'Music' },
          render: () => <Tab.Pane loading={false}>
            <Music/>
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'invitation', icon: 'envelope', content: 'Invitation' },
          render: () => <Tab.Pane loading={false}>
            <Invitation/>
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'guest', icon: 'users', content: 'Guest' },
          render: () => <Tab.Pane loading={false}>
            <Guest/>
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
              <li className=""><Link to="/order">Order</Link></li>
              <li className="active">{this.state.name}</li>
            </ol>
          </section>
          <section className="content">
            <div className="box box-border-radius">
              <div className="box-header with-border">
                <h3 className="box-title">Order Detail</h3>
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
    order: state.order.order,
  };
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getOrder: getOrder,
    getOrders: getOrders,
    storeOrder: storeOrder,
    toggleActiveOrder: toggleActiveOrder,
    destroyOrder: destroyOrder,
    getActivePackages: dispatch(getActivePackages()),
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Detail));
