import React, { Component } from 'react';
import {Link, Route}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <aside className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img src="http://localhost:8000/AdminLTE-245/dist/img/avatar.png" className="img-circle" alt="User Image"/>
              </div>
              <div className="pull-left info">
                {/* <p>{this.props.profile.name}</p> */}
                <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
              </div>
            </div>
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">Dashboard</li>
              <li>
                <Link to="/dashboard"><i className="fa fa-dashboard"></i> <span>Dashboard</span></Link>
              </li>
              <li className="header">Config</li>
              <li>
                <Link to="/feature"><i className="fa fa-rocket"></i> <span>Feature</span> </Link>
              </li>
              <li>
                <Link to="/package"><i className="fa fa-gift"></i> <span>Package</span> </Link>
              </li>
              <li className="header">Menu</li>
              <li><Link to="/customer">
                <i className="fa fa-users"></i> <span>Customer</span> </Link>
              </li>
              <li className="header">Site</li>
              <li>
                <a href="#" target="_blank"><i className="fa fa-globe"></i> <span>Site</span> </a>
              </li>
              <li className="header"></li>
            </ul>
          </section>
        </aside>
      </React.Fragment>
    );
  }
}

// function mapStateToProps(state){
//   return {
//     profile: state.users.profile,
//   };
// };
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({
//   }, dispatch)
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Sidebar);

export default Sidebar;
