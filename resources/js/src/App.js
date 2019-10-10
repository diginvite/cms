import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './containers/Layout';
import Dashboard from './containers/Dashboard';
import FeatureIndex from './containers/features/Index';
import PackageIndex from './containers/packages/Index';

class App extends Component {
  render() {
      return (
        <div>
          <BrowserRouter>
            <Switch>
            <Layout>
              <Route exact path="/" component={Dashboard}/>
              <Route exact path="/feature" component={FeatureIndex}/>
              <Route exact path="/package" component={PackageIndex}/>
            </Layout>
          </Switch>
          </BrowserRouter>
        </div>
      );
  }
}

export default App;
