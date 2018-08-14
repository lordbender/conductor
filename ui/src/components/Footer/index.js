import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sys: {}
    };

    axios.get('/api/sys/').then(({ data: sys }) => {
      this.state = {
        sys
      };
      window.sys = this.state.sys;
    });
  }

  render() {
    return (
      <div>
        <span className="footer-text">Server: </span>
        <a href={this.state.sys.server} target="_new" className="small" style={{ color: 'white' }}>
          {this.state.sys.server}
        </a>
        <span style={{ float: 'right' }}>
          <span className="footer-text">
            Version: {this.state.sys.version} | Build Date: {this.state.sys.buildDate}
          </span>
        </span>
      </div>
    );
  }
}

export default connect(state => state.workflow)(Footer);
