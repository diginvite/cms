import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Tab, Dimmer, Loader, Image, Segment, Grid, Divider, Header, Icon} from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import update from 'react-addons-update';

import { getPackage, updatePackage, featureSyncPackage } from '../../actions/package-action';
import { getFeature, updateFeature } from '../../actions/feature-action';

import CreateForm from '../../components/features/Form';
// import Feature from '../../components/packages/Feature';
import Loading from '../../components/Loading';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      nameError: false,
      slug: this.props.match.params.slug,
      description: '',
      valueType: 0,
      valueTypeError: false,
      active: true,
      data: [],
      alert: null,
      isLoading: true,
    }
  }

  componentDidMount(){
    this.props.getFeature(this.state.slug).then(() => {
      this.setState({
        name: this.props.feature.name,
        description: this.props.feature.description,
        active: this.props.feature.active,
        valueType: this.props.feature.valueType,
        isLoading: false,
      })
    })
  }

  onChange(e, {value, name}){
    if (!this.state.active) {
      this.setState({
        [name]: value
      }, () => {
        if (this.state.name === '') {
          this.setState({nameError: true})
        }else{
          this.setState({nameError: false})
        }
      })
    }
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
          description: this.state.description,
          valueType: this.state.valueType,
        }
        this.props.updateFeature(slug, data).then(() => {
          toast.success("Data saved !", {
            position: toast.POSITION.TOP_RIGHT
          });
        });
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
              valueType={this.state.valueType}
              onChange={(e, meta) => this.onChange(e, meta)}
              onSubmit={(e) => this.onSubmit(e)}
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
              <li className=""><Link to="/feature">Feature</Link></li>
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
    feature: state.feature.feature,
  };
};
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getFeature: getFeature,
    updateFeature: updateFeature,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Index));
