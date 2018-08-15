import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import defaultQuery from './defaultElasticQuery';
import { executeElasticQuery, setQuery } from '../../../reducers/elastic';

const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
`;

const FormWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const FormSection = styled.div`
  padding: 15px;
`;

const Actions = styled.div`
  padding: 15px;
`;

const QueryResult = styled.div`
  padding: 15px;
  min-height: 300px;
  min-width: 400px;
  margin-top: 20px;
`;

class QueryTools extends React.Component {
  state = {
    validJson: true
  };

  async componentWillMount() {
    this.props.setQuery(defaultQuery);
    await this.props.executeElasticQuery();
  }

  validateJson = query => {
    try {
      JSON.parse(query);
      this.setState({
        validJson: true
      });
    } catch (e) {
      this.setState({
        validJson: false
      });
    }
  };
  render() {
    const { query, result } = this.props;
    const { validJson } = this.state;

    return (
      <Wrapper>
        <FormWrapper>
          <FormSection>
            <label>Use Query Syntax Denoted Here:</label>
            &nbsp;
            <a href="https://github.com/elastic/elasticsearch-js" target="_blank" rel="noopener noreferrer">
              https://github.com/elastic/elasticsearch-js
            </a>
            <pre>
              {`
{
  {
    "index":"conductor",
    "type":"workflow",
    "body":{
       "query or filter":{
          "match":{
             "workflowType":"kitchensink"
          }
       }
    }
 }
              `}
            </pre>
          </FormSection>
          <FormSection>
            <span style={{ display: validJson ? 'none' : 'inline', color: 'red' }}>Invalid Json</span>
            <br />
            <label>Elastic Query:</label>
            <textarea
              id="elastic-query"
              style={{ color: validJson ? 'inherit' : 'red', width: '100%' }}
              value={query}
              onChange={({ target: { value = '{}' } }) => {
                this.props.setQuery(value);
                this.validateJson(value);
              }}
              cols="100"
              rows="15"
            />
            <Actions>
              <Button disabled={!validJson} bsStyle="danger" onClick={() => this.props.executeElasticQuery()}>
                Execute Query
              </Button>
            </Actions>
          </FormSection>
        </FormWrapper>
        <QueryResult>
          <pre style={{ width: '100%' }}>{JSON.stringify(result || {}, null, 3)}</pre>
        </QueryResult>
      </Wrapper>
    );
  }
}

export default connect(
  state => ({
    query: state.elastic.query,
    result: state.elastic.result
  }),
  {
    executeElasticQuery,
    setQuery
  }
)(QueryTools);
