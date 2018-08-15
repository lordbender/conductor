import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { executeElasticQuery, setQuery } from '../../../reducers/elastic';

const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
`;

const FormWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column-reverse;
`;

const Form = styled.div`
  padding: 15px;
`;

const Actions = styled.div`
  padding: 15px;
`;

const QueryResult = styled.div`
  padding: 15px;
`;

const QueryTools = props => {
  const { query, result } = props;

  console.log('query >', query);
  return (
    <Wrapper>
      <FormWrapper>
        <Form>
          <textarea
            value={query}
            onChange={({ target: { value = '{}' } }) => {
              props.setQuery(value);
            }}
            cols="120"
            rows="30"
          />
          <Actions>
            <Button bsStyle="danger" onClick={() => props.executeElasticQuery()}>
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
};

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
