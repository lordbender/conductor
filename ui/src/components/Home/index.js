import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer from '../common/Footer';
import ErrorPage from '../common/Error';

// eslint-disable-next-line no-confusing-arrow
const Home = props =>
  !props.error ? (
    <div>
      <div>
        <ErrorPage />
        <div>{props.children}</div>
      </div>
      <Footer />
    </div>
  ) : (
    this.props.children
  );

export default withRouter(Home);
