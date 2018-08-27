import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import packageJson from '../../../package.json';

const TopNav = props => (
  <Navbar staticTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Button bsStyle="link" onClick={() => props.history.push('/')}>
          Conductor
        </Button>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} onClick={() => props.history.push('/events')}>
        <i className="fa fa-circle-thin" />
        &nbsp; Event Handlers
      </NavItem>
      <NavItem eventKey={2} onClick={() => props.history.push('/workflow/metadata')}>
        <i className="fa fa-star" />
        &nbsp; Workflow Defs
      </NavItem>
      <NavDropdown eventKey={3} title="Workflow" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1} onClick={() => props.history.push('/workflow')}>
          <i className="fa fa-circle-thin" />
          &nbsp; All
        </MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

export default withRouter(TopNav);
