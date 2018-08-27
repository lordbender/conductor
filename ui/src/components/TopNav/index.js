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
      <NavItem eventKey={1} href="#" onClick={() => props.history.push('/workflow')}>
        Workflows
      </NavItem>
      <NavItem eventKey={2} href="#" onClick={() => props.history.push('/workflow/metadata')}>
        Workflow Defs
      </NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

export default withRouter(TopNav);
