import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grapher from 'components/Grapher';
import { fetchBlueprint } from 'stores/blueprint/detail';

const styles = () => ({
  root: {
    width: '100%',
    marginTop: 3
  }
});

const GraphDetailContentArea = styled.div`
  display: flex;
  flex-direction: row;
`;

const GraphArea = styled.div`
  min-width: 400px;
`;

const DetailArea = styled.div`
  min-width: 250px;
`;

class Detail extends React.Component {
  async componentWillMount() {
    const {
      match: {
        params: { workflowType }
      }
    } = this.props;
    await this.props.fetchBlueprint(workflowType);
  }

  render() {
    const { blueprint = {} } = this.props;

    console.log('blueprint 1 => ', blueprint);
    return (
      <GraphDetailContentArea>
        <GraphArea>
          <Grapher blueprint={blueprint} />
        </GraphArea>
        <DetailArea>
          <pre id="test-graph">{JSON.stringify(blueprint, null, 4)}</pre>
        </DetailArea>
      </GraphDetailContentArea>
    );
  }
}

Detail.propTypes = {
  blueprint: PropTypes.object.isRequired
};

export default connect(
  state => ({
    blueprint: state.blueprint.detail.blueprint
  }),
  {
    fetchBlueprint
  }
)(withStyles(styles)(Detail));
