import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { executeElasticQuery, setQuery } from '../../../reducers/elastic';
import defaultQuery from '../../../reducers/defaultElasticQuery';

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

const Form = styled.div`
  padding: 15px;
`;

const Actions = styled.div`
  padding: 15px;
`;

const QueryResult = styled.div`
  padding: 15px;
  min-height: 450px;
  min-width: 300px;
`;

class QueryTools extends React.Component {
  state = {
    validJson: true
  };

  async componentWillMount() {
    this.props.setQuery(defaultQuery);
    await this.props.executeElasticQuery();
  }

  validateJson = () => {
    const { query } = this.props;
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
          <div>
            Use Query Syntax Denoted Here:{' '}
            <a href="https://github.com/elastic/elasticsearch-js" target="_blank" rel="noopener noreferrer">
              https://github.com/elastic/elasticsearch-js
            </a>
            <pre>
              {`
{
  index: 'twitter',
  type: 'tweets',
  body: {
    query: {
      match: {
        body: 'elasticsearch'
      }
    }
  }
}
              `}
            </pre>
          </div>
          <Form>
            <textarea
              value={query}
              onChange={({ target: { value = '{}' } }) => {
                this.props.setQuery(value);
                this.validateJson();
              }}
              cols="120"
              rows="30"
            />
            <Actions>
              <Button disabled={!validJson} bsStyle="danger" onClick={() => this.props.executeElasticQuery()}>
                Execute Query
              </Button>
            </Actions>
          </Form>
        </FormWrapper>
        <QueryResult>
          <pre>{JSON.stringify(result || {}, null, 3)}</pre>
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
