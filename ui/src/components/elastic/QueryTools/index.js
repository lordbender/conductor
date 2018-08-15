import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

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

class QueryTools extends React.Component {
  state = {
    query: '',
    result: 'Result Placeholder...'
  };

  executeQuery = () => {
    const { query, result } = this.state;

    console.log('query => ', query);
    this.setState({ result: query });
  };

  render() {
    const { query, result } = this.state;

    return (
      <Wrapper>
        <FormWrapper>
          <Form>
            <textarea
              value={query}
              onChange={({ target: { value: query = '' } }) => {
                this.setState({ query });
              }}
              cols="120"
              rows="30"
            />
            <Actions>
              <Button bsStyle="danger" onClick={this.executeQuery}>
                Execute
              </Button>
            </Actions>
          </Form>
        </FormWrapper>
        <QueryResult>{result}</QueryResult>
      </Wrapper>
    );
  }
}

export default QueryTools;
