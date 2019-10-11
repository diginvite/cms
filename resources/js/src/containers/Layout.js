import React, { Component } from 'react';
import Header from '../components/layouts/Header';
import Sidebar from '../components/layouts/Sidebar';
import Footer from '../components/layouts/Footer';

import 'semantic-ui-css/semantic.min.css'

class Layout extends Component {
	render(props) {
		return (
      <div>
        <Header/>
        <Sidebar/>
          <div className="content-wrapper">
            {this.props.children}
          </div>
        <Footer/>
      </div>
    );
	}
}

export default Layout;
