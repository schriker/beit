import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './store/actions/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';
import Offers from './containers/Offers/Offers';
import OfferDetail from './containers/Offers/OfferDetail/OfferDetail';
import AddOffer from './containers/UserPages/AddOffer/AddOffer';
import UserOffers from './containers/UserPages/UserOffers/UserOffers';

class App extends Component {

  componentDidMount() {
    this.props.fetchData();
    this.props.authStateChange();
  }

  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Layout>
            <Switch>
              <Route exact path="/add-offer" component={AddOffer} />
              <Route exact path="/my-offers" component={UserOffers} />
              <Route exact path="/offer/:id" component={OfferDetail} />
              <Route exact path="/:exp/:stack/:lang/:city" component={Offers} />
              <Route exact path="/:exp/:stack/:lang" component={Offers} />
              <Route exact path="/:exp/:stack" component={Offers} />
              <Route exact path="/:exp" component={Offers} />
              <Route exact path="/" component={Offers} />
            </Switch>
          </Layout>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    authStateChange: () => dispatch(action.authStateChange()),
    fetchData: ()=> dispatch(action.fetchData())
  }
}

export default connect(null, mapDispatchToProps)(App);
