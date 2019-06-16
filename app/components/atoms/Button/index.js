import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.TouchableOpacity`

`

class Button extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Wrapper>
        {children}
      </Wrapper>
    )
  }
}

export default Button;
