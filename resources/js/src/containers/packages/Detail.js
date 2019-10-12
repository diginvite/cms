import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab, Dimmer, Loader, Image, Segment, Grid, Divider, Header, Icon, Button} from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import update from 'react-addons-update';

import { getPackage, updatePackage, featureSyncPackage } from '../../actions/package-action';

import CreateForm from '../../components/packages/CreateForm';
import Feature from '../../components/packages/Feature';
import Price from '../../components/packages/Price';
import Loading from '../../components/Loading';
import PriceForm from '../../components/prices/Form';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      slug: this.props.match.params.slug,
      nameError: false,
      description: '',
      active: true,
      data: [],
      alert: null,
      isLoading: true,
      features: [],
      prices: [],
      priceForm: false,
      price: 0,
      priceE: false,
      priceSelling: 0,
      priceSellingE: false,
      priceDate: '',
      priceDateE: false,
    }
  }

  componentDidMount(){
    this.props.getPackage(this.state.slug).then(() => {
      this.setState({
        id: this.props.package.id,
        name: this.props.package.name,
        description: this.props.package.description,
        active: this.props.package.active,
        features: this.props.package.features,
        prices: this.props.package.prices,
        isLoading: false,
      })
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
      if (this.state.price === '') {
        this.setState({priceE: true})
      }else{
        this.setState({priceE: false})
      }
      if (this.state.priceSelling === '') {
        this.setState({priceSellingE: true})
      }else{
        this.setState({priceSellingE: false})
      }
      if (this.state.priceDate === '') {
        this.setState({priceDateE: true})
      }else{
        this.setState({priceDateE: false})
      }
    })
  }

  onSubmit(e){
    e.preventDefault();
    if (!this.state.active) {
      const slug = this.state.slug;
      if (this.state.name == '') {
        this.setState({nameError: true})
      }else{
        const data = {
          name: this.state.name,
          description: this.state.description
        }
        this.props.updatePackage(slug, data).then(() => {
          toast.success("Data saved !", {
            position: toast.POSITION.TOP_RIGHT
          });
        });
      }
    }
  }

  onActiveChange(i, data){
    let features = this.state.features;
    features[i]["detail"]['active'] = !features[i]["detail"]['active'];
    this.setState({features: features})
  }

  onUnlimitedChange(i, data){
    let features = this.state.features;
    features[i]["detail"]['unlimited'] = !features[i]["detail"]['unlimited'];
    this.setState({features: features})
  }

  onQuantityChange(e, i){
    let features = this.state.features;
    let value = e.target.value;
    features[i]["detail"]['quantity'] = value;
    this.setState({features: features})
  }

  onSave(i, data){
    this.props.featureSyncPackage(this.state.slug, data)
    .then(() => {
      toast.success("Data saved !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }

  onPriceSubmit(e){
    e.preventDefault();
    if (this.state.price === '') {
      this.setState({priceE: true})
    }else{
      if (this.state.priceSelling === '') {
        this.setState({priceSellingE: true})
      }else{
        if (this.state.priceDate === '') {
          this.setState({priceSellingE: true})
        }else{
          const data = {
            price: this.state.price,
            priceSelling: this.state.priceSelling,
            date: this.state.priceDate,
            packageId: this.state.id,
          }
          this.props.updatePackage(slug, data).then(() => {
            toast.success("Data saved !", {
              position: toast.POSITION.TOP_RIGHT
            });
          });
        }
      }
    }
  }

  render() {
    if (this.state.isLoading) {
      return(
        <Loading/>
      )
    }

      const panes = [
        {
          menuItem: { key: 'edit', icon: 'edit', content: 'Edit' },
          render: () => <Tab.Pane disabled={this.state.active}>
            <CreateForm
              name={this.state.name}
              nameError={this.state.nameError}
              description={this.state.description}
              onChange={(e) => this.onChange(e)}
              onSubmit={(e) => this.onSubmit(e)}
            />
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'feature', icon: 'rocket', content: 'Feature' },
          render: () => <Tab.Pane loading={false}>
            <Feature
              data={this.state.features}
              onActiveChange={(i, data) => this.onActiveChange(i, data)}
              onUnlimitedChange={(i, data) => this.onUnlimitedChange(i, data)}
              onSave={(i, data) => this.onSave(i, data)}
              onQuantityChange={(e, i) => this.onQuantityChange(e, i)}
            />
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'price', icon: 'money', content: 'Price' },
          render: () => <Tab.Pane loading={false}>
            <PriceForm
              onHide={() => this.setState({priceForm: false})}
            />
            <Price
              data={this.state.prices}
            />
          </Tab.Pane>,
        },
      ];

      return (
        <React.Fragment>
          <section className="content-header">
            <h1>
              Dashboard
              <small>Control panel</small>
            </h1>
            <ol className="breadcrumb">
              <li className=""><Link to="/dashboard">Dashboard</Link></li>
              <li className=""><Link to="/package">Package</Link></li>
              <li className="active">{this.state.name}</li>
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
    package: state.package.package,
  };
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getPackage: getPackage,
    updatePackage: updatePackage,
    featureSyncPackage: featureSyncPackage,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Index));
