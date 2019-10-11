import React, { Component } from 'react';
import {Link}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
// import { Tabs, Tab } from 'react-bootstrap';
import { Tab } from 'semantic-ui-react'

import Table from '../../components/packages/Table';
import CreateForm from '../../components/packages/CreateForm';

// import {getPosts, destroyPost, toggleActivePost, togglePublishPost} from '../../actions/post-action';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      nameError: false,
      description: '',
    }
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
      this.setState({name: '', description: ''});
    }
  }

  handleDelete(data) {
    // let result = confirm("Want to delete?");
    // if (result) {
    //   this.props.destroyPost(data);
    // }    
  }

  handleToggleActive(data, i){
    // this.props.toggleActivePost(data, i);
  }

  handleTogglePublish(data, i){
    // this.props.togglePublishPost(data, i);
  }

  render() {
      const panes = [
        {
          menuItem: { key: 'list', icon: 'list', content: 'List' },
          render: () => <Tab.Pane>
            <Table
              data={this.props.packages}
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
    // getPosts: dispatch(getPosts()),
    // destroyPost: destroyPost,
    // toggleActivePost: toggleActivePost,
    // togglePublishPost: togglePublishPost,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Index));
