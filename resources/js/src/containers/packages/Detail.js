import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab, Dimmer, Loader, Image, Segment, Grid, Divider, Header, Icon, Button, Modal} from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import update from 'react-addons-update';
import moment from 'moment';

import { getPackage, updatePackage, featureSyncPackage, storePrice, destroyPrice, updatePrice} from '../../actions/package-action';

import CreateForm from '../../components/packages/CreateForm';
import Feature from '../../components/packages/Feature';
import Loading from '../../components/Loading';
import Price from '../../components/prices/Table';
import PriceForm from '../../components/prices/Form';
import ModalConfirm from '../../components/modals/Confirm';

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
      priceFormEdit: false,
      priceId: null,
      price: 0,
      priceE: false,
      priceSelling: 0,
      priceSellingE: false,
      priceDate: '',
      priceDateE: false,
      priceAlert: false,
      alert: false,
      alertContent: null,
      index: null,
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

  onChange(e, {name, value}){
    this.setState({
      [name]: value
    }, () => {
      if (name === 'name') {
        if (this.state.name === '') {
          this.setState({nameError: true})
        }else{
          this.setState({nameError: false})
        }
      }

      if (name === 'price') {
        if (this.state.price === '') {
          this.setState({priceE: true})
        }else{
          this.setState({priceE: false})
        }
      }

      if (name === 'priceDate') {
        if (this.state.priceDate === '') {
          this.setState({priceDateE: true})
        }else{
          this.setState({priceDateE: false})
        }
      }

      if (name === 'priceSelling') {
        if (this.state.priceSelling === '') {
          this.setState({priceSellingE: true})
        }else{
          this.setState({priceSellingE: false})
        }
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

  onPriceSubmit(){
    const currentDate = moment().format("YYYY-MM-DD");
    if (this.state.price <= 0) {
      this.setState({priceE: true})
    }else{
      if (this.state.priceSelling <= 0) {
        this.setState({priceSellingE: true})
      }else{
        if (this.state.priceDate === '' || this.state.priceDate <= currentDate) {
          this.setState({priceDateE: true})
        }else{
          const data = {
            price: this.state.price,
            sellingPrice: this.state.priceSelling,
            date: this.state.priceDate,
            packageId: this.state.id,
          }
          this.props.storePrice(data).then(() => {
            toast.success("Data saved !", {
              position: toast.POSITION.TOP_RIGHT
            });
            this.setState({price: 0, priceSelling: 0, prices: this.props.package.prices})
          });
        }
      }
    }
  }

  onConfrim(i, data, flag){
    const alertContent = () => {
      return(
        <ModalConfirm
          data={data}
          // open={this.state.priceAlert}
          header="Delete Data"
          content="Are you sure to delete this data?"
          onHide={() => {this.setState({priceAlert: false, alertContent: null})}}
          onAction={(data) => this.onDeletePrice(data)}
        />
      )
    }
    this.setState({alertContent: alertContent()})
  }

  onDeletePrice(data){
    this.props.destroyPrice(data).then(() => {
      var prices = this.state.prices;
      var pricesFiltered = prices.filter(price => price.id != data.id);
      this.props.destroyPrice(data).then(() => {
        toast.success("Data saved !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.setState({prices: pricesFiltered, alertContent: null});
      })
    })
  }

  onEditPrice(i, data){
    const date = moment().format("DD/MM/YYYY");
    this.setState({
      index: i,
      priceId: data.id,
      price: data.price,
      priceSelling: data.sellingPrice,
      priceDate: data.date,
      priceFormEdit: true,
    });
  }

  onUpdatePrice(){
    const data = {
      id: this.state.priceId,
      date: this.state.priceDate,
      price: this.state.price,
      sellingPrice: this.state.priceSelling,
    }
    this.props.updatePrice(data).then(() => {
      const i = this.state.index;
      const prices = this.state.prices;
      prices[i]["date"] = this.state.priceDate;
      prices[i]["price"]  = this.state.price;
      prices[i]["sellingPrice"] = this.state.priceSelling;
      this.setState({prices: prices, priceFormEdit: false})
      toast.success("Data updated !", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
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
            <Button primary size="small" onClick={() => this.setState({priceForm: !this.state.priceForm})}><Icon name="plus circle"/> Add</Button>
            <Price
              data={this.state.prices}
              onDelete={(i, data, flag) => this.onConfrim(i, data, flag)}
              onEdit={(i, data) => this.onEditPrice(i, data)}
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
          {/* {this.state.alert} */}
          {this.state.alertContent}
          <ToastContainer />
          <PriceForm
              onHide={() => this.setState({priceForm: false})}
              onSubmit={() => this.onPriceSubmit()}
              onChange={(e, meta) => this.onChange(e, meta)}
              price={this.state.price}
              priceE={this.state.priceE}
              priceSelling={this.state.priceSelling}
              priceSellingE={this.state.priceSellingE}
              priceDate={this.state.priceDate}
              priceDateE={this.state.priceDateE}
              open={this.state.priceForm}
            />
            <PriceForm
              onHide={() => this.setState({priceFormEdit: false})}
              onSubmit={() => this.onUpdatePrice()}
              onChange={(e, meta) => this.onChange(e, meta)}
              price={this.state.price}
              priceE={this.state.priceE}
              priceSelling={this.state.priceSelling}
              priceSellingE={this.state.priceSellingE}
              priceDate={this.state.priceDate}
              priceDateE={this.state.priceDateE}
              open={this.state.priceFormEdit}
            />
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
    storePrice: storePrice,
    destroyPrice: destroyPrice,
    updatePrice: updatePrice,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Index));
