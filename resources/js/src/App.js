import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './containers/Layout';
import Dashboard from './containers/Dashboard';
import FeatureIndex from './containers/features/Index';
import FeatureDetail from './containers/features/Deatil';
import PackageIndex from './containers/packages/Index';
import PackageDetail from './containers/packages/Detail';
import OrderIndex from './containers/orders/Index';
import OrderDetail from './containers/orders/Detail';
import TemplateIndex from './containers/templates/Index';

class App extends Component {
  render() {
      return (
        <div>
          <BrowserRouter>
            <Switch>
            <Layout>
              <Route exact path="/" component={Dashboard}/>
              <Route exact path="/feature" component={FeatureIndex}/>
              <Route exact path="/feature/detail/:slug" component={FeatureDetail}/>
              <Route exact path="/package" component={PackageIndex}/>
              <Route exact path="/package/detail/:slug" component={PackageDetail}/>
              <Route exact path="/order" component={OrderIndex}/>
              <Route exact path="/order/detail/:slug" component={OrderDetail}/>
              <Route exact path="/template" component={TemplateIndex}/>
            </Layout>
          </Switch>
          </BrowserRouter>
        </div>
      );
  }
}

export default App;
