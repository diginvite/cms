import React, { Component } from 'react';
import {Link, Route}  from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getUserProfile } from '../../../actions/user-action';

export class Header extends Component {
  constructor(props) {
     super(props);
  }

   render() {
      return (<React.Fragment>
        <header className="main-header">
          <Link to="/back/dashboard" className="logo">
            <span className="logo-mini"><b>dgnvt</b></span>
            <span className="logo-lg">Diginvite</span>
          </Link>
          <nav className="navbar navbar-static-top">
          <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {/*
                <li className="dropdown messages-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  Nama
                </a>
                <ul className="dropdown-menu">
                  <li className="header text-center"><b>Ganti SBU</b></li>
                  <li className="header">
                    <ul className="menu">
                      <form className="form-horizontal" action="" method="POST">
                        <div className="input-group">
                          <span className="input-group-addon">SBU</span>
                          <select className="form-control" name="company_id">
                          </select>
                        </div>
                      </form>
                    </ul>
                  </li>
                  <li className="header text-right"><button type="submit" className="btn btn-sm btn-primary btn-flat" ><i className="fa fa-exchange"></i>  Ganti SBU</button></li>
                </ul>
              </li>
              */}
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img src="https://cms.littlebogor.com/AdminLTE-245/dist/img/avatar.png" className="user-image" alt="User Image"/>
                  <span className="hidden-xs">
                    {/* {this.props.profile.name} */}
                    Admin
                  </span>
                </a>
                <ul className="dropdown-menu">
                  <li className="user-header">
                    <img src="https://cms.littlebogor.com/AdminLTE-245/dist/img/avatar.png" className="img-circle" alt="User Image"/>
                    <p> 
                      {/* {this.props.profile.name} - {this.props.profile.role === undefined ? '' : this.props.profile.role.name} <small>Member since {this.props.profile.created_at}</small> */}
                    </p>
                  </li>
                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="#" className="btn btn-sm btn-default btn-flat"><i className="fa fa-user-circle"></i> Profile</a>
                    </div>
                    <div className="pull-right">
                      <a className="btn btn-sm btn-default btn-flat" href="/logout">
                        <i className="fa fa-sign-out"></i>  Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        </header>
      </React.Fragment>);
   }
}

// function mapStateToProps(state){
//   return {
//     // profile: state.users.profile,
//   };
// };
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({
//     // getUserProfile: dispatch(getUserProfile()),
//   }, dispatch)
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Header);

export default Header;
