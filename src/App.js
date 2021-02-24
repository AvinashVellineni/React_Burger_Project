import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" component={BurgerBuilder}></Route>
          <Route path="/checkout" component={}></Route>
        </Layout>
      </div>
    );
  }
}

export default App;
