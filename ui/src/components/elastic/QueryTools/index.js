import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
  padding: 15px;
`;

class QueryTools extends React.Component {
  state = {
    query: ''
  };

  render() {
    const { query } = this.state;
    return (
      <FormWrapper>
        <textarea
          value={query}
          onChange={({ target: { value: query = '' } }) => {
            this.setState({ query });
          }}
          cols="120"
          rows="30"
        />
      </FormWrapper>
    );
  }
}

export default QueryTools;
