import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.View`
  height: 0.5px;
  background-color: #eee;
  margin: 0 ${props => (props.offset || 0)}px;
`

export default Wrapper
