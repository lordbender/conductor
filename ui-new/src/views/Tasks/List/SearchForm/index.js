import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
  
  render() {
   
    return (
      
      <div />
    );
  }
}


export default connect(
  state => ({
    workflows: state.workflow.list.searchForm.status,
    totalHits: state.workflow.list.searchForm.name
  }),
  {
    
  }
)(withStyles(styles)(React));
