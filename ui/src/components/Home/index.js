import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer from '../common/Footer';
import ErrorPage from '../common/Error';

class Home extends React.Component {
  state = {
    minimize: false
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ minimize: window.innerWidth < 600 });
  };

  render() {
    const marginLeft = this.state.minimize ? '52px' : '177px';
    return !this.props.error ? (
      <div style={{ height: '100%' }}>
        <div style={{ height: '100%' }}>
          <ErrorPage />
          <div>{this.props.children}</div>
        </div>
        <Footer />
      </div>
    ) : (
      this.props.children
    );
  }
}

export default withRouter(connect(state => state.global)(Home));
