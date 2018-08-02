import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import workflowMenuItems from './menu';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  cursor: pointer;
  margin-left: 5px;
`;

const HeaderItem = styled.div`
  line-height: 2em;
  font-weight: bold;
`;

const LeftMenu = props => {
  const menu = workflowMenuItems.map(
    (item, i) =>
      item.header ? (
        <HeaderItem key={`key-${uuid.v4()}`}>{item.label}</HeaderItem>
      ) : (
        <MenuItem
          onClick={() => {
            props.history.push(item.href);
          }}
          key={`key-${uuid.v4()}`}
        >
          <div>
            <i className={`fa ${item.icon}`} style={{ width: '20px' }} />
            <span style={{ marginLeft: '10px' }}>{item.label}</span>
          </div>
        </MenuItem>
      )
  );

  return (
    <Container>
      <div className="logo textual pull-left">
        <a href="/" title="Conductor">
          <h4>
            <i className="fa fa-bars" />
            Conductor
          </h4>
        </a>
      </div>
      <div>{menu}</div>
    </Container>
  );
};

// eslint-disable-next-line
export default connect(state => ({}))(withRouter(LeftMenu));
